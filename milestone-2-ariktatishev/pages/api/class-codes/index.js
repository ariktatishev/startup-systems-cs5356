// used to handle API calls
import { getServerSession } from "next-auth/next"
import * as db from '../../../services/database.mjs'

export default async function handler(req, res) {
    const session = await getServerSession(req, res)
    // console.log("Request", req)
    // console.log("Session", session)
    // console.log("Response", res)
    // console.log("The Query Index:", req.query)
    
    if (req.method === 'GET'){
        // console.log("Session contains", session)
        if (!session) {
            return res.status(401).json('Unauthorized') 
            // GET /api/class-codes returns 401 when user is not logged in
        }
        const classCodes = await db.getClassCodes(session.user.email)
        res.status(200).json(classCodes)
        // GET /api/class-codes returns 200 with empty classes for signed in users
    } else if (req.method === 'POST') {
        if (!session) {
            return res.status(401).json('Unauthorized')
            // POST /api/class-codes returns 401 when user is not logged in
        }
        const data = req.body
        if (!data.id) {
            return res.status(400).json({message: 'Missing id'})
            // POST /api/class-codes returns 400 when name field is missing
        }
        const classCode = await db.createClassCode({id: data.id, owner: session.user.email})
        return res.status(201).json(classCode)
        // POST /api/class-codes returns 201 when a class is created for current user
    } else if (req.method === 'DELETE') {
        const classCode = req.query['classCode']
        // console.log("Class code is", classCode)
        if (!session) {
            return res.status(401).json('Unauthorized')
            // DELETE /api/class-codes/:classCode returns 401 when user is not logged in
        }
        await db.deleteClassCode(classCode)
        return res.status(200).json('Class code deleted')
        // DELETE /api/class-codes/:classCode returns 200 when a class is deleted
    }

}