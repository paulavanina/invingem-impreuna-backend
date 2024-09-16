import { Result } from "express-validator";
import jwt from "jsonwebtoken";
import mssql from "mssql";
const fetchBlogsController = async (req, res) => {
  const sql = "SELECT blog_id, titlu, descriere FROM [dbo].[blogs]";
  const request = new mssql.Request();

  request.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({ Error: "eroare in obtinerea datelor" });
    }
    const blogsDetails = result.recordset;
    return res.status(200).json(blogsDetails);
  });
};

export default fetchBlogsController;
