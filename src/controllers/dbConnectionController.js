import { runQuery } from "../utils/function.js"
const dbConnectionController= async ( req,res) => {
  const dbQuery ="SELECT TOP (10) * FROM [dbo].[users]"
  runQuery(dbQuery)
    .then((dbRes) => {
      res
        .status(200)
        .send({
          response: dbRes.recordset,
          status: 200,
        })
        .end()
    })
    .catch((dbErr) => {
        console.dbErr('interogarea la baza de date a esuat.');
        throw dbErr;
    })
}

export default dbConnectionController 

