import express from "express";
const router = express.Router();
import { userRoutes } from "./user.routes.js";
import { accidentRoutes } from "./accident.routes.js";

router.use("/user", userRoutes);
router.use("/accident", accidentRoutes);
export { router };
