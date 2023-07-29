import express from "express";
import { aggregateHoursByUsers } from "../services/analytics";
const router = express.Router();

router.post("/", (req, res) => {
	aggregateHoursByUsers(req.body)
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((error) => {
			res.status(500).json({ error: true, message: error.message });
		});
});

export default router;