import mssql from 'mssql'
import { Result } from "express-validator";
import jwt from 'jsonwebtoken'

const blogController= async ( req,res) => {
try{
  const authHeader=req.headers['authorization'];
    const token=authHeader&&authHeader.split(' ')[1];

    if(!token)
    {
        return res.status(400).json({Error:"Token-ul lipseste."});
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err,user)=>{
        if(err){
            return res.status(401).json({Error:"Token invalid"});
        }
    const userUUID=user.id;

    const blogSql = "INSERT INTO blogs (blog_id, userUUID, titlu, descriere ) OUTPUT Inserted.blog_id VALUES (NEWID(), @userUUID, @titlu, @descriere)";
    const request = new mssql.Request();
    
    request.input('titlu', mssql.VarChar, req.body.titlu);
    request.input('descriere', mssql.Text, req.body.descriere);
    request.input('userUUID', mssql.UniqueIdentifier, userUUID);
   
    request.query(blogSql, (err, result) => {
      if (err) {
        return res.status(400).json({ Error: "Eroare la inserarea datelor." });
      }
      return res.status(200).json({ Status: "Datele au fost adaugate cu succes in bd." });
    });
  });
}catch(error){
  return res.status(200).json({Error:"a aparut o eroare"});
}
};

  export default blogController;