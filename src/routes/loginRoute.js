import { Router } from "express";
import loginController from "../controllers/loginController.js";

const loginRoute = Router();

loginRoute.post("/login", (req, res) => {
  loginController(req, res);
});

export default loginRoute;
