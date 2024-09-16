import { Router } from "express";
import dbConnectionController from "../controllers/dbConnectionController.js";

const dbConnectionRoutes = Router();

dbConnectionRoutes.get("/test", (req, res) => {
  return dbConnectionController(req, res);
});

export default dbConnectionRoutes;
