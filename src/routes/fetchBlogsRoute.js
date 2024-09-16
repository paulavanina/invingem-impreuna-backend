import { Router } from "express";
import fetchBlogsController from "../controllers/fetchBlogsController.js";
const fetchBlogsRoute = Router();

fetchBlogsRoute.get("/blogs", (req, res) => {
  fetchBlogsController(req, res);
});

export default fetchBlogsRoute;
