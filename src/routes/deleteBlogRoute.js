import { Router } from "express";
import deleteBlogController from "../controllers/deleteBlogController.js";

const deleteBlogRoute = Router();
deleteBlogRoute.post("/deleteBlog", (req, res) => {
  deleteBlogController(req, res);
});

export default deleteBlogRoute;
