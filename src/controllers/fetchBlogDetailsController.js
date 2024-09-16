import { Result } from "express-validator";
import jwt from "jsonwebtoken";
import mssql from "mssql";
const fetchBlogDetailsController = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).json({ Error: "Token-ul lipseste." });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
      if (err) {
        return res.status(401).json({ Error: "Token invalid" });
      }
      const userUUID = user.id;
      const sql =
        "SELECT blog_id, titlu, descriere from blogs WHERE userUUID=@userUUID";
      const request = new mssql.Request();

      request.input("userUUID", mssql.UniqueIdentifier, userUUID);

      request.query(sql, (err, result) => {
        if (err) {
          return res.status(400).json({ Error: "eroare in obtinerea datelor" });
        }

        if (result.recordset.length === 0) {
          return res
            .status(404)
            .json({ Error: "utilizatorul nu a fost gasit" });
        }
        return res.status(200).json(result.recordset);
      });
    });
  } catch (error) {
    return res.status(400).json({ Error: "a aparut o eroare" });
  }
};

export default fetchBlogDetailsController;
