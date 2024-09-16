import { Router } from "express";
import loginController from "../controllers/loginController.js";

const loginRoute = Router();

loginRoute.post("/login", (req, res) => {
  return loginController(req, res);
});

export default loginRoute;
