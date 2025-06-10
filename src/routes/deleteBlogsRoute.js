import { Router } from "express";
import deleteBlogsController from "../controllers/deleteBlogController.js";

const deleteBlogsRoute = Router();
deleteBlogsRoute.post("/blogs/:blog_id", (req, res) => {
    deleteBlogsController(req, res);
});

export default deleteBlogsRoute;
