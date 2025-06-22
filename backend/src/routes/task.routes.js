import express from "express";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controller/task.controller.js";
import { authenticate } from "../middlware/authorize.js";

const taskRoutes = express();

taskRoutes.post("/create", authenticate, createTask);
taskRoutes.get("/fetch", authenticate, getTasks);
taskRoutes.get("/fetch/:id", authenticate, getTask);
taskRoutes.put("/update/:id", authenticate, updateTask);
taskRoutes.delete("/delete/:id", authenticate, deleteTask);

export default taskRoutes;