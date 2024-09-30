import { Result } from "express-validator";
import jwt from "jsonwebtoken";
import mssql from "mssql";
const fetchBlogPageController = async (req, res) => {
  try {
    const { blog_id } = req.params;
    const sql =
      "SELECT blogs.blog_id, blogs.titlu, blogs.descriere, blogs.picture, blogs.data_curenta, users.nume, users.prenume, users.avatar FROM [dbo].[blogs] INNER JOIN users on blogs.userUUID=users.userUUID  WHERE blogs.blog_id=@blog_id";
    const request = new mssql.Request();
    request.input("blog_id", mssql.UniqueIdentifier, blog_id);
    request.query(sql, (err, result) => {
      if (err) {
        return res.status(400).json({ Error: "eroare in obtinerea datelor" });
      }
      const blog = result.recordset[0];
      blog.picture = blog.picture ? blog.picture.toString("base64") : null;
      blog.avatar = blog.avatar ? blog.avatar.toString("base64") : null;

      return res.status(200).json(blog);
    });
  } catch (error) {
    return res.status(400).json({ Error: "a aparut o eroare" });
  }
};

export default fetchBlogPageController;
