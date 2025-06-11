const updateUserRoleController = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    const request = new mssql.Request();
    request.input("id", mssql.UniqueIdentifier, id);
    request.input("role", mssql.VarChar, role);

    const updateRole = "UPDATE Users SET role=@role WHERE userUUID=@id";
    try {
        await request.query(updateRole);
        return res
            .status(200)
            .json({ Status: "Rolul user-ului a fost actualizat cu succes." });
    } catch (error) {
        res.status(500).json({ Error: "Eroare in actualizarea rolului" });
    }
}

export default updateUserRoleController;
