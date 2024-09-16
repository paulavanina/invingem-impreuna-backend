import { Router } from "express"
import fetchBlogsController from "../controllers/fetchBlogsController";
const fetchBlogsRoute=Router()

fetchBlogsRoute.get("/blogs",(req,res)=>{
  return fetchBlogsController(req,res);
})



export default fetchBlogsRoute;