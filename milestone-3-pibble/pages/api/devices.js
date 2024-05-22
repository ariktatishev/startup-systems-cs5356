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
    if (req.method === "POST") {
      const newDevice = req.body;
      const { name, location, uniqueId } = newDevice;

      await sql`
        INSERT INTO devices (
          name,
          location,
          uniqueid
        ) VALUES (
          ${String(newDevice.name)},
          ${String(newDevice.location)},
          ${String(newDevice.uniqueId)}
        )
      `;

      res.status(201).json(newDevice);
    } else if (req.method === "GET") {
      const devices = await sql`SELECT * FROM devices`;
      res.status(200).json(devices);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error inserting new device:", error.message);
    console.error("Error stack trace:", error.stack);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
