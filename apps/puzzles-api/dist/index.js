"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const admin_controller_1 = require("./app/controllers/admin.controller");
const puzzle_controller_1 = require("./app/controllers/puzzle.controller");
// CONFIG
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ROUTES
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Chess Puzzle API.' });
});
app.get('/api', puzzle_controller_1.PuzzleController);
app.get('/admin', admin_controller_1.AdminController);
// START THE SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
