import mssql from "mssql";

const updateProfileController = async (req, res) => {
  const { nume, prenume, email } = req.body;
  const avatar = req.file;
  const userUUID = req.body.userUUID;
  try {
    const request = new mssql.Request();
    request.input("nume", nume || null);
    request.input("prenume", prenume || null);
    request.input("email", email || null);
    request.input("userUUID", mssql.UniqueIdentifier, userUUID);

    let updateProfileSQL = `
      UPDATE Users
      SET
        nume = COALESCE(@nume, nume),
        prenume = COALESCE(@prenume, prenume),
        email = COALESCE(@email, email)
    `;

    if (avatar) {
      request.input("avatar", mssql.VarBinary, avatar.buffer);
      updateProfileSQL += `, avatar = @avatar`;
    }

    updateProfileSQL += ` WHERE userUUID = @userUUID`;

    await request.query(updateProfileSQL);

    return res.status(200).json({ message: "Profil actualizat cu succes." });
  } catch (error) {
    console.error("Eroare la actualizarea profilului:", error);
    res.status(500).json({ error: "Eroare internă la actualizarea profilului." });
  }
};

export default updateProfileController;
