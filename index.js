import express, { request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dbConnectionRoutes from "./src/routes/dbConnectionRoutes.js";
import dotenv from "dotenv";
import signupRoute from "./src/routes/signupRoute.js";
import loginRoute from "./src/routes/loginRoute.js";
import userProfileRoute from "./src/routes/userProfileRoute.js";
import blogDetailsRoute from "./src/routes/blogDetailsRoute.js";
import createBlogRoute from "./src/routes/createBlogRoute.js";
import fetchBlogsRoute from "./src/routes/fetchBlogsRoute.js";
import fetchBlogsPageRoute from "./src/routes/fetchBlogPageRoute.js";
import deleteBlogRoute from "./src/routes/deleteBlogRoute.js";
import createCommentRoute from "./src/routes/createCommentRoute.js";
import getCommentsRoute from "./src/routes/getCommentsRoute.js";
import deleteCommentRoute from "./src/routes/deleteCommentRoute.js";
import deleteUserRoute from "./src/routes/deleteUserRoute.js";
import fetchUsersRoute from "./src/routes/fetchUsersRoute.js";
import updateUserRoleRoute from "./src/routes/updateUserRoleRoute.js";
import chatbotRoute from "./src/routes/chatbotRoute.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  })
);
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  next();
});
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
app.use("/", createCommentRoute);
app.use("/", getCommentsRoute);
app.use("/", deleteCommentRoute);
app.use("/", deleteBlogRoute);
app.use("/", deleteUserRoute);
app.use("/", fetchUsersRoute);
app.use("/", updateUserRoleRoute);
app.use("/", chatbotRoute);
process.on("uncaughtException", (err) => console.error(err));

app.listen(PORT, () => {
  console.log(`See the port ${PORT}`);
});
