import fetchBlogDetailsController from "../controllers/fetchBlogDetailsController.js";
import { Router } from "express";

const blogDetailsRoute = Router();

blogDetailsRoute.get("/blog-details", (req, res) => {
  fetchBlogDetailsController(req, res);
});
export default blogDetailsRoute;
