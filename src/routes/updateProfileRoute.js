import { Router } from "express";
import updateProfileController from "../controllers/updateProfileController.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const updateProfileRoute = Router();

updateProfileRoute.put(`/updateProfile`, upload.single("avatar"), (req, res) => {
    updateProfileController(req, res);
});

export default updateProfileRoute;
