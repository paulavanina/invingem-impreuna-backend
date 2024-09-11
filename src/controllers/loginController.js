import mssql from 'mssql'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
const loginController=async(req,res)=>{
    const { email, parola } = req.body;
    const sqlLogIn = "SELECT * FROM users WHERE email = @email";
  
    const request = new mssql.Request();
    request.input('email', mssql.VarChar, email);
  
    request.query(sqlLogIn, (err, result) => {
      if (err) {
        return res.status(500).json({ Error: "Server error." });
      }
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ Error: "Utilizatorul nu a fost gasit." });
      }
  
    const user=result.recordset[0];
  
    bcrypt.compare(parola, user.parola, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ Error: "Eroare in compararea parolelor." });
      }
      if (!isMatch) {
        return res.status(400).json({ Error: "Credentiale invalide." });
      }
      //se genereaza token
      const token=jwt.sign(
        { id: user.userUUID, email:user.email},
          process.env.SECRET_TOKEN,
          {expiresIn: '1h'}
        );
  
        res.status(200).json({token, Status:"Succes."})
    });
    });
}

export default loginController;