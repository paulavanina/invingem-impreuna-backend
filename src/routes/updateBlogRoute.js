import { Router } from "express";
import updateBlogController from "../controllers/updateBlogController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const updateBlogRoute = Router();

updateBlogRoute.put(`/updateBlog`, upload.single("picture"), (req, res) => {
    updateBlogController(req, res);
});

export default updateBlogRoute;
