import { Router } from "express";
import fetchBlogPageController from "../controllers/fetchBlogPageController.js";
const fetchBlogsPageRoute = Router();

fetchBlogsPageRoute.get(`/blog-page-details/:blog_id`, (req, res) => {
  fetchBlogPageController(req, res);
});

export default fetchBlogsPageRoute;
