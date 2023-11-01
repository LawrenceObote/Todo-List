const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodoById,
  editTodo,
  deleteTodo,
  getTodos,
  createTable,
} = require("./controller");

router.use((req, res, next) => {
  next();
});

router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:id", getTodoById);
router.get("/createtable", createTable);
router.put("/", editTodo);
router.delete("/", deleteTodo);

module.exports = router;
