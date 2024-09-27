import dotenv from "dotenv"
import DATABASE_CREDENTIALS from "../utils/constants.js"
import sql from "mssql"

dotenv.config()

const connectionString = process.env["COMMUNICATION_SERVICES_CONNECTION_STRING"]

export const runQuery = async (query) => {
  // sql.connect() will return the existing global pool if it exists or create a new one if it doesn't
  const pool = await sql.connect(DATABASE_CREDENTIALS)
  return await pool.query(query) 
}

