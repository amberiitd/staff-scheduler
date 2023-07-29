import express from "express";
import { createSchedule, deleteSchedule, getSchedule } from "../services/schedule";
const router = express.Router();

router.post("/", (req, res) => {
	getSchedule(req.body)
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((error) => {
			res.status(500).json({ error: true, message: error.message });
		});
});

router.put("/", (req, res) => {
	createSchedule(req.body)
		.then((data) => {
			res.json(data);
		})
		.catch((error) => {
			res.status(500).json({ error: true, message: error.message });
		});
});

router.delete("/", (req, res) => {
	deleteSchedule(req.body)
		.then((data) => {
			res.json(data);
		})
		.catch((error) => {
			res.status(500).json({ error: true, message: error.message });
		});
});

export default router;
