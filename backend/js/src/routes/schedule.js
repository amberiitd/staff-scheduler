"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schedule_1 = require("../services/schedule");
const router = express_1.default.Router();
router.post("/", (req, res) => {
    (0, schedule_1.getSchedule)(req.body)
        .then((data) => {
        res.status(200).json(data);
    })
        .catch((error) => {
        res.status(500).json({ error: true, message: error.message });
    });
});
router.put("/", (req, res) => {
    (0, schedule_1.createSchedule)(req.body)
        .then((data) => {
        res.json(data);
    })
        .catch((error) => {
        res.status(500).json({ error: true, message: error.message });
    });
});
router.delete("/", (req, res) => {
    (0, schedule_1.deleteSchedule)(req.body)
        .then((data) => {
        res.json(data);
    })
        .catch((error) => {
        res.status(500).json({ error: true, message: error.message });
    });
});
exports.default = router;
