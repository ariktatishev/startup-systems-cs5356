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
  try {
    const products = await sql`SELECT * FROM products`;
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
