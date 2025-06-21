
const updateProfileController = async (req, res) => {
  const { nume, prenume, email } = req.body;
  const userUUID = req.user.userUUID;
  const avatar = req.file;
  try {
    const request = new mssql.Request();
    request.input("nume", nume || null);
    request.input("prenume", prenume || null);
    request.input("email", email || null);
    request.input("userUUID", mssql.UniqueIdentifier, userUUID);

    const updateProfileSQL = `
    UPDATE Users
      SET
        nume = COALESCE(@nume, nume),
        prenume = COALESCE(@prenume, prenume),
        email = COALESCE(@email, email)
      WHERE userUUID = @userUUID
    `;
    if (picture) {
      request.input("avatar", mssql.VarBinary, picture.buffer);
      updateBlogSQL += `,
                    avatar = @avatar`;
    }
    updateBlogSQL += `
                WHERE blog_id = @blog_id`;

    await request.query(updateProfileSQL);

    return res.status(200).json({ message: "Profil actualizat cu succes." });
  } catch (error) {
    console.error("Eroare la actualizarea profilului:", error);
    res.status(500).json({ error: "Eroare internă la actualizarea profilului." });
  }
};
export default updateProfileController;