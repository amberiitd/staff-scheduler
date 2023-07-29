"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analytics_1 = require("../services/analytics");
const router = express_1.default.Router();
router.post("/", (req, res) => {
    (0, analytics_1.aggregateHoursByUsers)(req.body)
        .then((data) => {
        res.status(200).json(data);
    })
        .catch((error) => {
        res.status(500).json({ error: true, message: error.message });
    });
});
exports.default = router;
