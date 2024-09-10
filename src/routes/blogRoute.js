import { Router } from "express"
import blogController from "../controllers/blogController.js";

const blogRoute=Router()

blogRoute.post("/blog",(req,res)=>{
  return blogController(req,res);
})

export default blogRoute;