const express = require("express");
const router = express.Router();

const {
    createTodo,
    getTodoById,
    upsertTodos,
    deleteTodo,
    getTodos,

} = require("./controller");

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })

router.post("/", createTodo);
router.get("/", getTodos);
router.patch("/", upsertTodos);
router.delete("/", deleteTodo);

module.exports = router;
