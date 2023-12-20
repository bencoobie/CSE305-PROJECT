import express from "express";
const accidentRoutes = express.Router();
import { accidentcontroller } from "../controllers/accident.controller.js";

accidentRoutes.get("/", accidentcontroller.get);
accidentRoutes.post("/", accidentcontroller.create);
accidentRoutes.patch("/:id", accidentcontroller.update);
accidentRoutes.delete("/:id", accidentcontroller.delete);

export { accidentRoutes };
