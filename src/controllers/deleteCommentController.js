import multer from "multer";
import mssql from "mssql";
import jwt from "jsonwebtoken";

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

const deleteCommentController = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(400).json({ Error: "Token-ul lipseste." });
        }

        jwt.verify(token, process.env.SECRET_TOKEN, async (err, user) => {
            if (err) {
                return res.status(401).json({ Error: "Token invalid" });
            }

            const userUUID = user.id;
            const { comment_id } = req.params;

            const deleteCommentSql =
                " DELETE FROM comments WHERE comment_id = @comment_id AND user_id = @userUUID";
            const request = new mssql.Request();

            request.input("comment_id", mssql.VarChar, comment_id);
            request.input("userUUID", mssql.UniqueIdentifier, userUUID);

            request.query(deleteCommentSql, (err, result) => {
                if (err) {
                    return res
                        .status(400)
                        .json({ Error: "Eroare la stergerea comentariului." });
                }
                return res
                    .status(200)
                    .json({ Status: "Comentariul a fost sters cu succes." });
            });
        });
    } catch (error) {
        return res.status(400).json({ Error: "A apărut o eroare." });
    }
};

export default deleteCommentController;
