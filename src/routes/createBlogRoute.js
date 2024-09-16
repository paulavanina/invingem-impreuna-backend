import { Router } from "express"
import createBlogController from "../controllers/createBlogController.js";

const createBlogRoute=Router()

createBlogRoute.post("/blog",(req,res)=>{
  return createBlogController(req,res);
})



export default createBlogRoute;