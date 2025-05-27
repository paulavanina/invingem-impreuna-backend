import { Router } from "express";
import getCommentsController from "../controllers/getCommentsController.js";
const getCommentsRoute = Router();

getCommentsRoute.get("/comments", (req, res) => {
    getCommentsController(req, res);
});

export default getCommentsRoute;
