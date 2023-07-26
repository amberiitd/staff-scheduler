"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schedule_1 = require("../services/schedule");
const router = express_1.default.Router();
// router.get('/:id', (req, res) => {
//   res.send(`schedule with id ${req.params.id}`)
// })
router.get("/", (req, res) => {
    (0, schedule_1.getSchedule)(req.body)
        .then((data) => {
        res.json(data);
    })
        .catch((error) => {
        res.status(500).json({ error: true, message: error.message });
    });
});
router.post("/", (req, res) => {
    res.send("Schedule edited");
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
    res.send("Schedule deleted");
});
exports.default = router;
