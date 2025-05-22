import multer from "multer";
import mssql from "mssql";
import jwt from "jsonwebtoken";

// multer stocheaza fisierele in mem, nu pe dis
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

const createBlogController = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(400).json({ Error: "Token-ul lipseste." });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, async (err, user) => {
      if (err) {
        return res.status(401).json({ Error: "Token invalid" });
      }
      const userUUID = user.id;

      const { titlu, descriere } = req.body;
      const imageBuffer = req.file.buffer; // img sub forma de buffer

      const blogSql =
        "INSERT INTO blogs (blog_id, userUUID, titlu, descriere, picture) OUTPUT Inserted.blog_id VALUES (NEWID(), @userUUID, @titlu, @descriere, @picture)";
      const request = new mssql.Request();

      request.input("titlu", mssql.NVarChar(255), titlu);
      request.input("descriere", mssql.NVarChar(mssql.MAX), descriere);
      request.input("userUUID", mssql.UniqueIdentifier, userUUID);
      request.input("picture", mssql.VarBinary, imageBuffer);

      request.query(blogSql, (err, result) => {
        if (err) {
          return res
            .status(400)
            .json({ Error: "Eroare la inserarea datelor." });
        }
        return res
          .status(200)
          .json({ Status: "Datele au fost adaugate cu succes in bd." });
      });
    });
  } catch (error) {
    return res.status(400).json({ Error: "A apărut o eroare." });
  }
};

export default createBlogController;
