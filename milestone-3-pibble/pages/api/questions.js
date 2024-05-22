import { randomInt } from "crypto";
import postgres from "postgres";
const sql = postgres({
  host: "ep-divine-term-a5zuimer.us-east-2.aws.neon.tech",
  database: "neondb",
  username: "neondb_owner",
  password: "MhS4Kkl5qYXu",
  port: 5432,
  ssl: "require",
});

async function generateUniqueId() {
  let id;
  let idExists = true;
  while (idExists) {
    id = randomInt(1, 1000000).toString();
    const result = await sql`
      SELECT EXISTS (SELECT 1 FROM questions WHERE id = ${id})
    `;
    idExists = result[0].exists;
  }
  return id;
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const questions = await sql`
        SELECT * FROM questions
      `;
      res.status(200).json(questions);
    } else if (req.method === "POST") {
      const { question } = req.body;
      const id = await generateUniqueId();
      const newQuestion = await sql`
        INSERT INTO questions (id, question, answers)
        VALUES (${id}, ${question}, '')
        RETURNING *
      `;
      res.status(201).json(newQuestion[0]);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error handling questions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
