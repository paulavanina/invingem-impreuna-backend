import multer from "multer";
import mssql from "mssql";
import jwt from "jsonwebtoken";

// multer stocheaza fisierele in mem, nu pe dis
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

const deleteBlogController = async (req, res) => {
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

      const { blog_id } = req.body;

      const deleteBlogSql =
        "DELETE FROM blogs WHERE blog_id=@blog_id and userUUID=@userUUID";
      const request = new mssql.Request();

      request.input("blog_id", mssql.VarChar, blog_id);
      request.input("userUUID", mssql.UniqueIdentifier, userUUID);

      request.query(deleteBlogSql, (err, result) => {
        if (err) {
          return res
            .status(400)
            .json({ Error: "Eroare la stergerea datelor." });
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

export default deleteBlogController;
