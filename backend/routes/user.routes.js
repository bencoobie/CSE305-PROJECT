import express from "express";
const userRoutes = express.Router();
import { usercontroller } from "../controllers/user.controller.js";
userRoutes.get("/", usercontroller.get);
userRoutes.post("/signin", usercontroller.signin);
userRoutes.post("/signup", usercontroller.create);
userRoutes.patch("/:id", usercontroller.update);
userRoutes.delete("/:id", usercontroller.delete);
export { userRoutes };
