import express, { request } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dbConnectionRoutes from "./src/routes/dbConnectionRoutes.js"
import mssql from 'mssql'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import blogRoute from "./src/routes/blogRoute.js"
import signupRoute from "./src/routes/signupRoute.js"
import loginRoute from "./src/routes/loginRoute.js"
import userProfileRoute from "./src/routes/userProfileRoute.js"

dotenv.config();
const app = express()
app.use(express.json());

const PORT = process.env.PORT || 8080
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  })
)
app.use(bodyParser.json())
app.use('/', dbConnectionRoutes)
app.use('/', blogRoute)
app.use('/', signupRoute)
app.use('/', loginRoute)
app.use('/', userProfileRoute)
process.on("uncaughtException", (err) => console.error(err))

app.listen(PORT, () => {
  console.log(`See the port ${PORT}`)
})
