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
exports.AdminController = void 0;
const oracledb_1 = __importStar(require("oracledb"));
const puzzle_controller_1 = require("./puzzle.controller");
const AdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === 'production' &&
        (req.headers['x-admin-secret'] === undefined ||
            req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET)) {
        res
            .status(400)
            .send((0, puzzle_controller_1.ErrorResponse)('Request must be sent via RapidAPI', 400));
        return;
    }
    const count = parseInt(req.query.count) || 1;
    const results = [];
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection({
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            connectionString: process.env.DB_CONNECTION_STRING,
            externalAuth: false,
        });
        for (let i = 0; i < count; i++) {
            // Get the oldest unchecked puzzle (or never checked)
            // NULLS FIRST ensures puzzles that have never been checked are prioritised
            const result = yield connection.execute(`SELECT puzzleid, fen, rating, ratingdeviation, moves, themes 
       FROM PUZZLES 
       ORDER BY last_checked NULLS FIRST, last_checked ASC 
       FETCH FIRST 1 ROW ONLY`, {}, { outFormat: oracledb_1.OUT_FORMAT_OBJECT });
            if (result.rows === undefined || result.rows.length === 0) {
                res.status(404).send((0, puzzle_controller_1.ErrorResponse)('No Matching Puzzles', 404));
                return;
            }
            const puzzle = {
                puzzleid: result.rows[0].PUZZLEID,
                rating: result.rows[0].RATING,
                ratingdeviation: result.rows[0].RATINGDEVIATION,
            };
            const lichessPuzzleResponse = yield fetch(`https://lichess.org/api/puzzle/${puzzle.puzzleid}`);
            if (!lichessPuzzleResponse.ok) {
                throw new Error('Error fetching from Lichess');
            }
            const lichessData = (yield lichessPuzzleResponse.json());
            if (!lichessData || !lichessData.puzzle || !lichessData.puzzle.rating) {
                throw new Error('Error parsing puzzle from Lichess');
            }
            // Update the puzzle if rating has changed, and always update last_checked
            if (lichessData.puzzle.rating !== parseInt(puzzle.rating)) {
                yield connection.execute(`UPDATE PUZZLES 
         SET RATING = :rating, last_checked = SYSTIMESTAMP 
         WHERE PUZZLEID = :puzzleid`, {
                    rating: lichessData.puzzle.rating,
                    puzzleid: puzzle.puzzleid,
                }, { autoCommit: true });
            }
            else {
                // Even if rating hasn't changed, update last_checked so we move on to the next puzzle
                yield connection.execute(`UPDATE PUZZLES 
         SET last_checked = SYSTIMESTAMP 
         WHERE PUZZLEID = :puzzleid`, {
                    puzzleid: puzzle.puzzleid,
                }, { autoCommit: true });
            }
            results.push({
                checked: puzzle.puzzleid,
                ratingChanged: lichessData.puzzle.rating !== parseInt(puzzle.rating),
            });
            // Wait 3 seconds between each puzzle (except the last one)
            if (i < count - 1) {
                yield new Promise((resolve) => setTimeout(resolve, 3000));
            }
        }
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .send((0, puzzle_controller_1.ErrorResponse)('Error fetching puzzles. Please contact the admin.', 500));
        return;
    }
    if (connection) {
        try {
            yield connection.close();
        }
        catch (err) {
            console.error('Error closing connection:', err);
        }
    }
    res.status(200).send({
        processed: results.length,
        results,
    });
});
exports.AdminController = AdminController;
