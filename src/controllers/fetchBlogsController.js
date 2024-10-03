import { Result } from "express-validator";
import jwt from "jsonwebtoken";
import mssql from "mssql";
const fetchBlogsController = async (req, res) => {
  try {
    const sql =
      "SELECT blogs.blog_id, blogs.titlu, blogs.descriere, blogs.picture, users.nume, users.prenume, users.avatar FROM [dbo].[blogs] INNER JOIN users on blogs.userUUID=users.userUUID";
    const request = new mssql.Request();

    request.query(sql, (err, result) => {
      if (err) {
        return res.status(400).json({ Error: "eroare in obtinerea datelor" });
      }
      const blogs = result.recordset.map((blog) => {
        return {
          ...blog,
          picture: blog.picture ? blog.picture.toString("base64") : null,
          avatar: blog.avatar ? blog.avatar.toString("base64") : null,
        };
      });
      return res.status(200).json(blogs);
    });
  } catch (error) {
    return res.status(400).json({ Error: "a aparut o eroare" });
  }
};

export default fetchBlogsController;
