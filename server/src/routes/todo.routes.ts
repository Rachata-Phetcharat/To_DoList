import { Router } from "express";
import {
  getTodos,
  addTodo,
  addTodoItem,
  updateTodo,
  updateTodoCompleted,
  deleteTodo,
  deleteTodoItem,
} from "../controllers/todo.controllers";

const router = Router();

router.get("/todos", getTodos);
router.post("/addTodo", addTodo);
router.post("/addTodoItem/:id", addTodoItem);
router.put("/updateTodo/:id", updateTodo);
router.put("/updateTodoCompleted/:todoId/items/:itemId", updateTodoCompleted);
router.delete("/todos/:id", deleteTodo);
router.delete("/todos/:todoId/items/:itemId", deleteTodoItem);

export default router;
