import { Router } from "express";
import signupController from "../controllers/signupController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const signupRoute = Router();

signupRoute.post("/signup", upload.single("avatar"), (req, res) => {
  signupController(req, res);
});

export default signupRoute;
