import express from "express";
import { createSchedule, getSchedule } from "../services/schedule";
const router = express.Router();

// router.get('/:id', (req, res) => {
//   res.send(`schedule with id ${req.params.id}`)
// })

router.get("/", (req, res) => {
	getSchedule(req.body)
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
	createSchedule(req.body)
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

export default router;
