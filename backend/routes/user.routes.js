import express from "express";
const userRoutes = express.Router();
import { usercontroller } from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/auth.js";
import { checkRoles } from "../middleware/check.role.js";

userRoutes.get("/", usercontroller.get);
userRoutes.post("/signin", usercontroller.signin);
userRoutes.post("/signup", usercontroller.create);
userRoutes.get("/logout", authenticateToken, usercontroller.logOut);
userRoutes.patch(
  "/:id",
  authenticateToken,
  checkRoles("user"),
  usercontroller.update
);
userRoutes.delete("/:id", authenticateToken, usercontroller.delete);
export { userRoutes };
