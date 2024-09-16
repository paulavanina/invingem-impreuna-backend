import { Router } from "express";
import userProfileController from "../controllers/userProfileController.js";

const userProfileRoute = Router();

userProfileRoute.get("/user-profile", (req, res) => {
  userProfileController(req, res);
});

export default userProfileRoute;
