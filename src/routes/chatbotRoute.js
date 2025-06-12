import chatbotController from "../controllers/chatbotController.js";
import { Router } from "express";

const chatbotRoute = Router();
chatbotRoute.post("/chatbot", (req, res) => {
    chatbotController(req, res);
});
export default chatbotRoute;