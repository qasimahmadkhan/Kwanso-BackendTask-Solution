const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task");

router.post("/create-task", taskController.createTask);
router.get("/list-task", taskController.listTasks);

module.exports = router;
