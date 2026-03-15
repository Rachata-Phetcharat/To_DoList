import { Request, Response } from "express";
import { TodoList, TodoListItem } from "../models/todo.model";

let todos: TodoList[] = [];

export const getTodos = (req: Request, res: Response) => {
  res.json(todos);
};

export const addTodo = (req: Request, res: Response) => {
  const newTodo: TodoList = {
    id: Date.now(),
    title: req.body.title,
    item: req.body.item || [],
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

export const addTodoItem = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;

  const todoList = todos.find((item) => item.id === parseInt(id));

  if (!todoList) {
    return res.status(404).json({ message: "ไม่พบรายการหลัก" });
  }

  const newTodoItem: TodoListItem = {
    id: Date.now(),
    title: title,
    completed: false,
  };

  if (!todoList.item) {
    todoList.item = [];
  }
  todoList.item.push(newTodoItem);

  res.status(201).json(newTodoItem);
};

export const updateTodo = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const updatedTodo = {
    ...todos[todoIndex],
    title: title ?? todos[todoIndex]?.title,
  } as TodoList;

  todos[todoIndex] = updatedTodo;

  return res.status(200).json(updatedTodo);
};

export const updateTodoCompleted = (
  req: Request<{ todoId: string; itemId: string }>,
  res: Response,
) => {
  const { todoId, itemId } = req.params;
  const { completed } = req.body;

  const todoList = todos.find((todo) => todo.id === parseInt(todoId));

  if (!todoList) {
    return res.status(404).json({ message: "ไม่พบรายการหลัก" });
  }

  // หา index ของ item เพื่อจะได้แก้ค่าใน array ได้ตรงๆ
  const itemIndex = todoList.item.findIndex((i) => i.id === parseInt(itemId));

  if (itemIndex === -1) {
    return res.status(404).json({ message: "ไม่พบรายการย่อย" });
  }

  // อัปเดต item โดยใช้ index ที่หาได้
  todoList.item[itemIndex] = {
    ...todoList.item[itemIndex],
    completed: completed ?? todoList.item[itemIndex]?.completed,
  } as TodoListItem;

  return res.status(200).json(todoList.item[itemIndex]);
};

export const deleteTodo = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== parseInt(id));

  res.status(204).send();
};

export const deleteTodoItem = (
  req: Request<{ todoId: string; itemId: string }>,
  res: Response,
) => {
  const { todoId, itemId } = req.params;

  const todoList = todos.find((todo) => todo.id === parseInt(todoId));

  if (!todoList) {
    return res.status(404).json({ message: "ไม่พบรายการหลัก" });
  }

  const itemExists = todoList.item.find((i) => i.id === parseInt(itemId));

  if (!itemExists) {
    return res.status(404).json({ message: "ไม่พบรายการย่อย" });
  }

  todoList.item = todoList.item.filter((i) => i.id !== parseInt(itemId));

  res.status(204).send();
};
