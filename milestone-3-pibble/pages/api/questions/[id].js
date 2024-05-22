import postgres from "postgres";
const sql = postgres({
  host: "ep-divine-term-a5zuimer.us-east-2.aws.neon.tech",
  database: "neondb",
  username: "neondb_owner",
  password: "MhS4Kkl5qYXu",
  port: 5432,
  ssl: "require",
});

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === "POST") {
      const { text } = req.body;
      const updatedQuestion = await sql`
        UPDATE questions 
        SET answers = ${text}
        WHERE id = ${id}
        RETURNING *;
      `;
      res.status(200).json(updatedQuestion[0]);
    } else if (req.method === "DELETE") {
      await sql`
        DELETE FROM questions
        WHERE id = ${id}
      `;
      res.status(200).json({ message: "Question deleted successfully" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error handling question:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
