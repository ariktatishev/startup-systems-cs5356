import postgres from "postgres";
import { sql } from "postgres";

export default async function handler(req, res) {
  const client = postgres({
    host: "ep-divine-term-a5zuimer.us-east-2.aws.neon.tech",
    database: "neondb",
    username: "neondb_owner",
    password: "MhS4Kkl5qYXu",
    port: 5432,
    ssl: "require",
  });

  try {
    if (req.method === "POST") {
      const newSchedule = req.body;
      await client`
        INSERT INTO schedules
        VALUES (
          ${String(newSchedule.id)},
          ${String(newSchedule.name)},
          ${String(newSchedule.days)},
          ${String(newSchedule.time)},
          ${String(newSchedule.portion)}
        )
      `;
      res.status(200).json({ message: newSchedule });
    } else if (req.method === "GET") {
      const schedules = await client`SELECT * FROM schedules`;
      res.status(200).json(schedules);
    } else if (req.method === "PUT") {
      const newSchedule = req.body;
      await client`
        UPDATE schedules
        SET
          name = ${String(newSchedule.name)},
          days = ${String(newSchedule.days)},
          time = ${String(newSchedule.time)},
          portion = ${String(newSchedule.portion)}
        WHERE
          id = ${String(newSchedule.id)}
      `;
      res.status(200).json({ message: "Schedule Updated" });
    } else if (req.method === "DELETE") {
      await client`
      DELETE FROM schedules
      WHERE
        id = ${String(req.query.id)}
      `;
      res.status(200).json({ message: "Schedule Deleted" });
    } else {
      res.status(405).json({ message: "Operation Not Allowed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}

// export default function handler(req, res) {
//   const schedulesPath = path.join(process.cwd(), 'public', 'data', 'schedules.json');

//   if (req.method === 'GET') {
//     try {
//       const schedules = JSON.parse(fs.readFileSync(schedulesPath, 'utf8'));
//       res.status(200).json(schedules);
//     } catch (error) {
//       console.error('Error reading schedules:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   } else if (req.method === 'POST') {
//     try {
//       const schedules = JSON.parse(fs.readFileSync(schedulesPath, 'utf8'));
//       const newSchedule = req.body;
//       newSchedule.id = schedules.length + 1;
//       schedules.push(newSchedule);
//       fs.writeFileSync(schedulesPath, JSON.stringify(schedules));
//       res.status(201).json(newSchedule);
//     } catch (error) {
//       console.error('Error creating schedule:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   } else if (req.method === 'PUT') {
//     try {
//       const schedules = JSON.parse(fs.readFileSync(schedulesPath, 'utf8'));
//       const updatedSchedule = req.body;
//       const scheduleIndex = schedules.findIndex(
//         (schedule) => schedule.id === updatedSchedule.id
//       );
//       if (scheduleIndex !== -1) {
//         schedules[scheduleIndex] = updatedSchedule;
//         fs.writeFileSync(schedulesPath, JSON.stringify(schedules));
//         res.status(200).json(updatedSchedule);
//       } else {
//         res.status(404).json({ message: 'Schedule not found' });
//       }
//     } catch (error) {
//       console.error('Error updating schedule:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   } else if (req.method === 'DELETE') {
//     try {
//       const schedules = JSON.parse(fs.readFileSync(schedulesPath, 'utf8'));
//       const scheduleId = parseInt(req.query.id, 10);
//       const scheduleIndex = schedules.findIndex(
//         (schedule) => schedule.id === scheduleId
//       );
//       if (scheduleIndex !== -1) {
//         const deletedSchedule = schedules.splice(scheduleIndex, 1);
//         fs.writeFileSync(schedulesPath, JSON.stringify(schedules));
//         res.status(200).json(deletedSchedule[0]);
//       } else {
//         res.status(404).json({ message: 'Schedule not found' });
//       }
//     } catch (error) {
//       console.error('Error deleting schedule:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
