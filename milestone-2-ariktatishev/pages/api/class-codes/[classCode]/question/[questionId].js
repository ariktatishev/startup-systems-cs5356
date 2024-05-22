// DELETE /api/class-codes/:class-codes/question/:question-id returns 200 when a question is deleted

import * as db from '../../../../../services/database.mjs';


export default async function handler(req, res) {
    const questionId = req.query['questionId'];
    if (req.method == 'DELETE'){
        await db.deleteQuestion(questionId)
        return res.status(200).json("Question deleted")
    }
}