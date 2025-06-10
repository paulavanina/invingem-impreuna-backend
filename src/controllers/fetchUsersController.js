import mssql from "mssql";
const fetchUsersController = async (req, res) => {
    try {
        const sql =
            "SELECT userUUID, nume, prenume, emai, avatar, role FROM [dbo].Users"
        const request = new mssql.Request();

        const result = await request.query(sql);

        const users = result.recordset.map((user) => {
            return {
                ...user,
                avatar: user.avatar ? user.avatar.toString("base64") : null,
            };
        });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ Error: "Eroare in obtinerea datelor." });
    }
};

export default fetchUsersController;
