import mssql from "mssql";

const deleteUserController = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(400).json({ Error: "Token-ul lipseste." });
        }

        const { id } = req.params;

        const deleteUserSql =
            "DELETE FROM Users WHERE userUUID=@id";
        const request = new mssql.Request();
        request.input("id", mssql.UniqueIdentifier, id);

        await request.query(deleteUserSql);
        return res
            .status(200)
            .json({ Status: "User-ul a fost sters cu succes." });
    } catch (error) {
        return res.status(500).json({ Error: "A apărut o eroare la stergere." });
    }
};

export default deleteUserController;
