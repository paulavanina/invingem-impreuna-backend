import { Router } from "express";
import deleteCommentController from "../controllers/deleteCommentController.js";

const deleteCommentRoute = Router();
deleteCommentRoute.delete("/comments/:comment_id", (req, res) => {
    deleteCommentController(req, res);
});

export default deleteCommentRoute;
