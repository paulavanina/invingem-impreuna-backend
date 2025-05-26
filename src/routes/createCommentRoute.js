import { Router } from "express";
import createCommentController from "../controllers/createCommentController.js";

const createCommentRoute = Router();
createBlogRoute.post("/comment", (req, res) => {
    createCommentController(req, res);
});

export default createCommentRoute;
