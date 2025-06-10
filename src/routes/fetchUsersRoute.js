import { Router } from "express";
import fetchUsersController from "../controllers/fetchBlogsController.js";
const fetchUsersRoute = Router();

fetchUsersRoute.get("/users", (req, res) => {
    fetchUsersController(req, res);
});

export default fetchUsersRoute;
