"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config(); // load .env file at the topmost
const schedule_1 = __importDefault(require("./src/routes/schedule"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get('/health-check', (req, res) => {
    res.status(200).json({ status: 200 });
});
app.use('/schedule', schedule_1.default);
// 404 Resource Not Found handler
app.use((req, res) => {
    res.status(404).json({ error: 'Resource Not Found' });
});
app.listen(8080);
