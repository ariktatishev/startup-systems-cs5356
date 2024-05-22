import postgres from "postgres";

export default async function handler(req, res) {
  const sql = postgres({
    host: "ep-divine-term-a5zuimer.us-east-2.aws.neon.tech",
    database: "neondb",
    username: "neondb_owner",
    password: "MhS4Kkl5qYXu",
    port: 5432,
    ssl: "require",
  });

  try {
    if (req.method === "DELETE") {
      await sql`
      UPDATE stats
      SET
        last_mealtime = ${String("N/A")},
        last_portion_size = ${String(0)},
        last_cleanup = ${String("N/A")},
        total_daily_intake = ${String(0)}
      `;
      res.status(200).json({ message: "Statistics Cleared Successfully" });
    } else if (req.method === "POST") {
      const newData = req.body;
      await sql`
      UPDATE stats
      SET
        last_mealtime = ${String(newData.last_mealtime)},
        last_portion_size = ${String(newData.last_portion_size)},
        last_cleanup = ${String(newData.last_cleanup)},
        total_daily_intake = ${String(newData.total_daily_intake)}
      `;
      res.status(200).json({ message: newData });
    } else if (req.method === "GET") {
      const stats = await sql`SELECT * FROM stats`;
      res.status(200).json(stats);
    } else {
      res.status(405).json({ message: "Operation Not Allowed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}
