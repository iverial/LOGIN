const { Router, application } = require("express");
const router = Router();
const { auth } = require("../middlewares/validateToken.js");
const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller.js");

const { createTaskSchema } = require("../schemas/task.schema.js");
const { validateSchema } = require("../middlewares/validator.middleware");

router.get("/tasks", auth, getTasks);
router.get("/tasks/:id", auth, getTask);
router.post("/tasks", auth, validateSchema(createTaskSchema), createTask);
router.delete("/tasks/:id", auth, deleteTask);
router.put("/tasks/i:id", auth, updateTask);

module.exports = router;
