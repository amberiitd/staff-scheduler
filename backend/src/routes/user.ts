import express from "express";
import { createSchedule, getSchedule } from "../services/schedule";
import { deleteUser, getAllUsers } from "../services/user";
const router = express.Router();

// router.get('/:id', (req, res) => {
//   res.send(`schedule with id ${req.params.id}`)
// })

router.get("/", (req, res) => {
	getAllUsers()
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((error) => {
			res.status(500).json({ error: true, message: error.message });
		});
});

router.delete("/", (req, res) => {
	deleteUser(req.body)
		.then((data) => {
			res.json(data);
		})
		.catch((error) => {
			res.status(500).json({ error: true, message: error.message });
		});
});

export default router;