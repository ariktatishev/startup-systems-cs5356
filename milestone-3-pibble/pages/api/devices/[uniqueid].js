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
  const { uniqueid } = req.query;

  try {
    if (req.method === "PUT") {
      const { name, location, uniqueId } = req.body;

      await sql`
        UPDATE devices
        SET name = ${name},
            location = ${location},
            uniqueid = ${uniqueId}
        WHERE uniqueid = ${uniqueid}
      `;

      res.status(200).json({ message: "Device updated successfully" });
    } else if (req.method === "DELETE") {
      const device = await sql`
        SELECT * FROM devices WHERE uniqueid = ${uniqueid}
      `;

      if (device.length === 0) {
        res.status(404).json({ message: "Device not found" });
      } else {
        await sql`
          DELETE FROM devices WHERE uniqueid = ${uniqueid}
        `;
        res.status(200).json({ message: "Device deleted successfully" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error updating/deleting device:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
