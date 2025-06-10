import mssql from "mssql";
import jwt from "jsonwebtoken";

const deleteBlogsController = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(400).json({ Error: "Token-ul lipseste." });
        }

        const user = jwt.verify(token, process.env.SECRET_TOKEN);
        const { blog_id } = req.params;

        const deleteBlogsSql =
            "DELETE FROM Blogs WHERE blog_id=@blog_id";
        const request = new mssql.Request();
        request.input("blog_id", mssql.UniqueIdentifier, blog_id);

        await request.query(deleteBlogsSql);
        return res
            .status(200)
            .json({ Status: "Blog-ul a fost sters cu succes." });
    } catch (error) {
        return res.status(500).json({ Error: "A apărut o eroare la stergere." });
    }
};

export default deleteBlogsController;
