import express, { request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dbConnectionRoutes from "./src/routes/dbConnectionRoutes.js";
import mssql from "mssql";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import signupRoute from "./src/routes/signupRoute.js";
import loginRoute from "./src/routes/loginRoute.js";
import userProfileRoute from "./src/routes/userProfileRoute.js";
import blogDetailsRoute from "./src/routes/blogDetailsRoute.js";
import createBlogRoute from "./src/routes/createBlogRoute.js";
import fetchBlogsRoute from "./src/routes/fetchBlogsRoute.js";
import fetchBlogsPageRoute from "./src/routes/fetchBlogPageRoute.js";
import deleteBlogRoute from "./src/routes/deleteBlogRoute.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  })
);
app.use(bodyParser.json());
app.use("/", dbConnectionRoutes);
app.use("/", signupRoute);
app.use("/", loginRoute);
app.use("/", userProfileRoute);
app.use("/", createBlogRoute);
app.use("/", blogDetailsRoute);
app.use("/", fetchBlogsRoute);
app.use("/", deleteBlogRoute);
app.use("/", fetchBlogsPageRoute);
process.on("uncaughtException", (err) => console.error(err));

app.listen(PORT, () => {
  console.log(`See the port ${PORT}`);
});
