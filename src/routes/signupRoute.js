import { Router } from "express";
import signupController from "../controllers/signupController.js";

const signupRoute = Router();

signupRoute.post("/signup", (req, res) => {
  return signupController(req, res);
});

export default signupRoute;
