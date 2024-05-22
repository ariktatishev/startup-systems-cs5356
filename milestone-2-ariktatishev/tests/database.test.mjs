import * as db from "./../services/database.mjs"
/*
CS5356 TODO 2a. Data Model

Below are the unit tests that describe the overall behavior of our data.
We can access the data by using the imported `db` service.

Run these with `npm run test-db`
*/

describe("database", () => {
  afterEach(async () => {
    await db.clear();
  });

  it("createClassCode", async () => {
    await db.createClassCode({ id: 'cs5356', owner: "user123" });
    
    const classCodes = await db.getClassCodes("user123")
    expect(classCodes.length).toEqual(1);
    expect(classCodes[0]).toEqual(
      jasmine.objectContaining({ id: 'cs5356', owner: "user123" })
    );
  });

  it("createQuestionForClassCode", async () => {
    const newClass = await db.createClassCode({ id: "cs5356", owner: "user123" });

    await db.createQuestionForClassCode(newClass.id, {
      question: "is the sky blue?",
      name: "anon456",
    });
    const questions = await db.getQuestions(newClass.id);

    expect(questions[0]).toEqual(
      jasmine.objectContaining({
        question: "is the sky blue?",
        name: "anon456",
      })
    );
  });

  it("createQuestionForClassCode returns null when class code doesnt exist", async () => {
    const question = await db.createQuestionForClassCode("fakeId", {
      question: "is the sky blue?",
      name: "anon123",
    });
    expect(question).toEqual(null);
  });
  
  it("deleteQuestion deletes the question", async () => {
    const newClass = await db.createClassCode({ id: 'cs5356' });
    const question = await db.createQuestionForClassCode(newClass.id, {
      question: "is the sky blue?",
      name: "anon123",
    });
    await db.deleteQuestion(question.id);

    const questions = await db.getQuestions(newClass.id);

    expect(questions).toHaveSize(0)
  });
});