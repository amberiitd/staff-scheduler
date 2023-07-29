"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../services/user");
const router = express_1.default.Router();
// router.get('/:id', (req, res) => {
//   res.send(`schedule with id ${req.params.id}`)
// })
router.get("/", (req, res) => {
    (0, user_1.getAllUsers)()
        .then((data) => {
        res.status(200).json(data);
    })
        .catch((error) => {
        res.status(500).json({ error: true, message: error.message });
    });
});
router.delete("/", (req, res) => {
    (0, user_1.deleteUser)(req.body)
        .then((data) => {
        res.json(data);
    })
        .catch((error) => {
        res.status(500).json({ error: true, message: error.message });
    });
});
exports.default = router;
