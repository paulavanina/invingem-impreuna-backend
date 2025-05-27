import mssql from "mssql";
const getCommentsController = async (req, res) => {

  const { blog_id } = req.query;
  try {
    const sql =
      (`SELECT c.comment_id, c.comment, c.created_at, c.blog_id, u.nume, u.prenume, u.avatar
      FROM comments c INNER JOIN Users u ON c.user_id = u.userUUID
      WHERE c.blog_id = @blog_id
      ORDER BY c.created_at DESC;
      `);
    const request = new mssql.Request();
    request.input("blog_id", mssql.VarChar, blog_id);

    request.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ Error: "eroare in obtinerea comentariilor" });
      }
      const comments = result.recordset.map((comment) => {
        return {
          ...comment,
          avatar: comment.avatar ? comment.avatar.toString("base64") : null,
        };
      });
      return res.status(200).json(comments);
    });
  } catch (error) {
    return res.status(400).json({ Error: "a aparut o eroare" });
  }
};

export default getCommentsController;
