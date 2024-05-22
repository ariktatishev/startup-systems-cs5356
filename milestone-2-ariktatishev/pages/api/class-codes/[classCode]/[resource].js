// pages/api/class-codes/[classCode]/question/[resource].js
import { getServerSession } from "next-auth/next"
import * as db from '../../../../services/database.mjs';

export default async function handler(req, res) {
  const session = await getServerSession(req, res)
  const { classCode, resource } = req.query;
  const dbObj = await db.openDb();
  const classCodeCheck = dbObj.classCodes.filter(c => c.id === classCode)

  // console.log("The Query Questions:", req.query)
  // console.log("Session contains", session)
  // console.log("Class code is", classCode)
  // console.log("Resource is", resource)
  // console.log("Body is", req.body)
  // console.log("Class code check is", classCodeCheck)
  
  if (req.method === 'GET') {
    // console.log("INSIDE GET")
    if (resource === 'question') {
      if (classCodeCheck.length == 0){
        return res.status(404).json([])
      }
      const classCodeQuestions = await db.getQuestions(classCode)
      return res.status(200).json(classCodeQuestions)
    } else if (!resource) {
      if (!session) {
        return res.status(401).end();
      }
      if (classCodeCheck.length == 0){
        return res.status(404).json([])
      }
      const classes = await db.getClasses(session.user.id)
      return res.status(200).json(classes)
    } else {
      res.status(404).end();
    }
  }

  if (req.method === 'POST') {
    // console.log("INSIDE POST")
    if (resource === 'question') {
      const { question, name } = req.body;
      if (classCodeCheck.length == 0){
        return res.status(404).json([])
      }
      const newQuestion = await db.createQuestionForClassCode(classCode, {question, name})
      return res.status(201).json(newQuestion)
    } else if (!resource) {
      const { name } = req.body;
      if (!name) {
        return res.status(400).end();
      }
      const newClass = await db.createClassForUser(session.user.id, {name})
      return res.status(201).json(newClass)
    } else {
      res.status(404).end();
    }
  }
  // // Handle any other HTTP method
  // res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  // res.status(405).end(`Method ${req.method} Not Allowed`);
}