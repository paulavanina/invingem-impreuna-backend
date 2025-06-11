import { Router } from "express";
import updateUserRoleController from "../controllers/updateUserRoleController.js";

const updateUserRoleRoute = Router();

updateUserRoleRoute.put(`/role/:id`, (req, res) => {
    updateUserRoleController(req, res);
});

export default updateUserRoleRoute;
