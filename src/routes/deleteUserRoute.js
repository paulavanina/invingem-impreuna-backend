import { Router } from "express";
import deleteUserController from "../controllers/deleteUserController.js";

const deleteUserRoute = Router();
deleteUserRoute.post("/users/:id", (req, res) => {
    deleteUserController(req, res);
});

export default deleteUserRoute;
