import { Result } from "express-validator";
import jwt from "jsonwebtoken";
import mssql from "mssql";
const userProfileController = async (req, res) => {
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
      "SELECT nume, prenume, email from users WHERE userUUID=@userUUID";
    const request = new mssql.Request();
    request.input("userUUID", mssql.VarChar, userUUID);

    request.query(sql, (err, result) => {
      if (err) {
        return res.status(400).json({ Error: "eroare in obtinerea datelor" });
      }

      if (result.recordset.length === 0) {
        return res.status(404).json({ Error: "utilizatorul nu a fost gasit" });
      }
      const userProfile = result.recordset[0];
      return res.status(200).json(userProfile);
    });
  });
};

export default userProfileController;
