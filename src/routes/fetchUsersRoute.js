import { Router } from "express";
import fetchUsersController from "../controllers/fetchUsersController.js";
const fetchUsersRoute = Router();

fetchUsersRoute.get("/users", (req, res) => {
    fetchUsersController(req, res);
});

export default fetchUsersRoute;
