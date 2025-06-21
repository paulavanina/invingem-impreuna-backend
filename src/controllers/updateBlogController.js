import mssql from "mssql";
import multer from "multer";
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

const updateBlogController = async (req, res) => {
    const { titlu, descriere, blog_id } = req.body;
    const picture = req.file;

    try {
        const request = new mssql.Request();
        request.input("titlu", titlu || null);
        request.input("descriere", descriere || null);
        request.input("blog_id", mssql.UniqueIdentifier, blog_id);

        let updateBlogSQL = `
            UPDATE blogs
            SET
                titlu = COALESCE(@titlu, titlu),
                descriere = COALESCE(@descriere, descriere)
        `;
        if (picture) {
            request.input("picture", mssql.VarBinary, picture.buffer);
            updateBlogSQL += `,
                picture = @picture`;
        }
        updateBlogSQL += `
            WHERE blog_id = @blog_id`;

        await request.query(updateBlogSQL);
        return res.status(200).json({ message: "Blog actualizat cu succes." });
    } catch (error) {
        console.error("Eroare la actualizarea blogului:", error);
        res.status(500).json({ error: "Eroare interna la actualizarea blogului." });
    }
};

export default updateBlogController;
