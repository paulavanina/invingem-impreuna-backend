import mssql from 'mssql'
const blogController= async ( req,res) => {
    const blogSql = "INSERT INTO blogs (blog_id, userUUID, titlu, descriere ) OUTPUT Inserted.blog_id VALUES (NEWID(), @userUUID, @titlu, @descriere)";
    const request = new mssql.Request();
    request.input('titlu', mssql.VarChar, req.body.titlu);
    request.input('descriere', mssql.Text, req.body.descriere);
    request.input('userUUID', mssql.UniqueIdentifier, req.body.userUUID);
   
    request.query(blogSql, (err, result) => {
      if (err) {
        return res.status(400).json({ Error: "Eroare la inserarea datelor." });
      }
      return res.status(200).json({ Status: "Datele au fost adaugate cu succes in bd." });
    });
  }

  export default blogController;