"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuzzleController = exports.ErrorResponse = void 0;
const oracledb_1 = __importStar(require("oracledb"));
const zod_1 = require("zod");
const ErrorResponse = (message, status) => {
    return {
        message,
        status,
    };
};
exports.ErrorResponse = ErrorResponse;
const QuerySchema = zod_1.z
    .object({
    id: zod_1.z
        .string()
        .max(6, 'ID must be 6 characters or less')
        .refine((val) => /^[a-z0-9]+$/i.test(val), {
        message: 'ID must be alphanumeric',
    })
        .optional(),
    rating: zod_1.z.coerce.number().min(1).optional(),
    playerMoves: zod_1.z.coerce.number().min(1).optional(),
    count: zod_1.z.coerce.number().min(1).max(500).optional(),
    themes: zod_1.z
        .string()
        .transform((val, ctx) => {
        try {
            const parsed = JSON.parse(val);
            if (!Array.isArray(parsed)) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Themes must be an array',
                });
                return zod_1.z.NEVER;
            }
            // Validate each theme is alphanumeric/safe
            if (!parsed.every((theme) => typeof theme === 'string' && /^[a-zA-Z0-9_-]+$/.test(theme))) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Themes must be alphanumeric with hyphens or underscores only',
                });
                return zod_1.z.NEVER;
            }
            return parsed;
        }
        catch (_a) {
            ctx.addIssue({
                code: 'custom',
                message: 'Invalid JSON format for themes',
            });
            return zod_1.z.NEVER;
        }
    })
        .optional(),
    themesType: zod_1.z.enum(['ALL', 'OR']).optional(),
})
    .refine((data) => {
    // If themes array has more than 1 element, themesType is required
    if (data.themes && data.themes.length > 1 && !data.themesType) {
        return false;
    }
    return true;
}, {
    message: 'themesType needed when multiple themes supplied',
    path: ['themesType'],
});
const PuzzleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // RapidAPI authentication check
    if (process.env.NODE_ENV === 'production' &&
        (req.headers['x-mashape-proxy-secret'] === undefined ||
            req.headers['x-mashape-proxy-secret'] !== process.env.RAPID_API_SECRET)) {
        res
            .status(400)
            .send((0, exports.ErrorResponse)('Request must be sent via RapidAPI', 400));
        return;
    }
    // Validate query parameters with Zod
    const queryValidation = QuerySchema.safeParse(req.query);
    if (!queryValidation.success) {
        const errorMessage = queryValidation.error.issues
            .map((err) => err.message)
            .join(', ');
        res.status(400).send((0, exports.ErrorResponse)(errorMessage, 400));
        return;
    }
    const validatedQuery = queryValidation.data;
    // Build query string and bind parameters
    let queryString = 'SELECT puzzleid,fen,rating,ratingdeviation,moves,themes FROM PUZZLES WHERE 1=1 ';
    const bindParams = {};
    let maxRows = 1; // Default to 1 row
    if (Object.keys(validatedQuery).length === 0) {
        // No query parameters - return a single random puzzle
        const randRating = Math.floor(Math.random() * (3001 - 511 + 1) + 511);
        queryString += 'AND rating BETWEEN :ratingLower AND :ratingUpper ';
        queryString += 'ORDER BY DBMS_RANDOM.VALUE';
        bindParams.ratingLower = randRating - 1;
        bindParams.ratingUpper = randRating + 1;
    }
    else if (validatedQuery.id) {
        // Handle ID query
        queryString += 'AND puzzleid = :puzzleid';
        bindParams.puzzleid = validatedQuery.id;
    }
    else {
        // Handle filtered queries
        maxRows = (_a = validatedQuery.count) !== null && _a !== void 0 ? _a : 1;
        // Player moves filter
        if (validatedQuery.playerMoves) {
            queryString +=
                " AND(LENGTH(MOVES) - LENGTH(replace(MOVES, ' ', '')) + 1) = :playerMovesCount ";
            bindParams.playerMovesCount = validatedQuery.playerMoves * 2;
        }
        // Themes filter
        // Note: CONTAINS() requires a text query expression as a literal string.
        // We've validated themes are alphanumeric via Zod, so it's safe to build this string.
        if (validatedQuery.themes) {
            const operator = validatedQuery.themesType === 'ALL' ? ' AND ' : ' OR ';
            const themesQuery = validatedQuery.themes.join(operator);
            queryString += " AND CONTAINS(THEMES, '" + themesQuery + "') > 0 ";
        }
        // Rating filter (always applied for performance)
        const rating = (_b = validatedQuery.rating) !== null && _b !== void 0 ? _b : Math.floor(Math.random() * (3001 - 511 + 1) + 511);
        queryString +=
            ' AND :rating BETWEEN RATING - RATINGDEVIATION AND RATING + RATINGDEVIATION ';
        bindParams.rating = rating;
        // Order by random
        queryString += ' ORDER BY DBMS_RANDOM.VALUE';
    }
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection({
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            connectionString: process.env.DB_CONNECTION_STRING,
            externalAuth: false,
        });
        // Set maxRows as a safety net and primary row limiter
        const result = yield connection.execute(queryString, bindParams, { maxRows, outFormat: oracledb_1.OUT_FORMAT_OBJECT });
        if (result.rows === undefined || result.rows.length === 0) {
            res.status(400).send((0, exports.ErrorResponse)('No Matching Puzzles', 400));
            return;
        }
        const puzzles = result.rows.map((puzzle) => ({
            puzzleid: puzzle.PUZZLEID,
            fen: puzzle.FEN,
            rating: puzzle.RATING,
            ratingdeviation: puzzle.RATINGDEVIATION,
            moves: puzzle.MOVES.split(' '),
            themes: puzzle.THEMES.split(' '),
        }));
        res.status(200).send({ puzzles });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .send((0, exports.ErrorResponse)('Error fetching puzzles. Please contact the admin.', 500));
        return;
    }
    finally {
        if (connection) {
            try {
                yield connection.close();
            }
            catch (err) {
                console.error('Error closing connection:', err);
            }
        }
    }
});
exports.PuzzleController = PuzzleController;
