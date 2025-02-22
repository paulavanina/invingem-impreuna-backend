import { runQuery } from "../utils/function.js";

const dbConnectionController = async (req, res) => {
  const dbQuery = "SELECT TOP (10) * FROM [dbo].[Users]";
  try {
    const dbRes = await runQuery(dbQuery);
    res.status(200).json({
      response: dbRes.recordset,
      status: 200,
    });
  } catch (error) {
    console.error("Interogarea la baza de date a eșuat:", error);
    res.status(500).json({ error: "Interogarea la baza de date a eșuat" });
  }
};

export default dbConnectionController;
