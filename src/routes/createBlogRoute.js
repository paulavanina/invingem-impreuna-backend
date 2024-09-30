import { Router } from "express";
import multer from "multer";
import createBlogController from "../controllers/createBlogController.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const createBlogRoute = Router();
createBlogRoute.post("/blog", upload.single("picture"), (req, res) => {
  createBlogController(req, res);
});

export default createBlogRoute;
