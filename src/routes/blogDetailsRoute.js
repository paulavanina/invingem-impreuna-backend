import blogDetailsController from "../controllers/blogDetailsController.js";
import { Router } from "express"

const blogDetailsRoute=Router()

blogDetailsRoute.get("/blog-details", (req,res)=>{
    return blogDetailsController(req,res);
  })
  export default blogDetailsRoute;
  