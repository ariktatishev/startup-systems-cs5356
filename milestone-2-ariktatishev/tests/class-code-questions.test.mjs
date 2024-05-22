import request from "supertest";
import { signIn, signOut } from "./utils.mjs";

/*
CS5356 TODO 2b. API Tests

Pre-req: `class-codes.test.mjs` & `login.test.mjs` should 
be passing before working on this integration test.

Run `npm run test-class-code-questions` to test this file.

Below are integration tests that make requests to a running 
NextJS server, to test all the APIs to manage Questions for a 
Class Code.

To get these to pass, add APIs to `pages/api/` to respond to 
these requests. Use the user's server side session to check 
if they are signed in. Import the db from `services/database.mjs`
to get access to the data.

Read through each test to understand what it is trying to do,
and what is expected.
*/

describe("Class Code Question Endpoints", () => {
  let req;
  
  beforeEach(async () => {
    req = request.agent('http://localhost:3000');

    await signIn(req, 'user123')
    await req.post("/api/class-codes").send({ id: "test-class" });
  });

  afterEach(async () => {
    await req.post('/api/reset').send()
  });
  
  it("POST /api/class-codes/:class-codes/question returns 201 when a new question is created by an anonymous user", async () => {
    await signOut(req)
   
    const response = await req.post(`/api/class-codes/test-class/question`).send({question: 'Why is the sky blue', name: 'anon'});
    expect(response.statusCode).toBe(201);
    expect(response.body.question).toEqual("Why is the sky blue")
    
  });

  it("POST /api/class-codes/:class-codes/question returns 201 when a new question is created", async () => {
    let response = await req.post(`/api/class-codes/test-class/question`);
    expect(response.statusCode).toBe(201);
    expect(response.body.id).not.toBe(null);

    // logout and create a question as a logged out user
    await req.get("/api/logout");

    // create a question as a signed out user
    response = await req
      .post(`/api/class-codes/test-class/question`)
      .send({ question: "why is the sky blue", name: "anon" });
    expect(response.statusCode).toBe(201);
    expect(response.body.question).toEqual("why is the sky blue");
  });

  it("POST /api/class-codes/:class-codes/question returns 404 when no class code found", async () => {
    const response = await req
      .post(`/api/class-codes/fakeClassCode/question`)
      .send({ question: "why is the sky blue", name: "anon" });
    expect(response.statusCode).toBe(404);
  });

  it("GET /api/class-codes/:class-codes/question returns 200 with questions from class code", async () => {  
    const response = await req.get(`/api/class-codes/test-class/question`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("GET /api/class-codes/:class-code returns 404 when no class session found", async () => {
    const response = await req.get("/api/class-codes/fakeClassCode");
    expect(response.statusCode).toBe(404);
  });

  it("DELETE /api/class-codes/:class-codes/question/:question-id returns 200 when a question is deleted", async () => {
    let response = await req
      .post(`/api/class-codes/test-class/question`)
      .send({ question: "why is the sky blue", name: "anon" });
    expect(response.statusCode).toBe(201);
    expect(response.body.question).toEqual("why is the sky blue");
    const questionId = response.body.id;

    response = await req.get(`/api/class-codes/test-class/question`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveSize(1);

    response = await req.delete(
      `/api/class-codes/test-class/question/${questionId}`
    );
    expect(response.statusCode).toBe(200);

    response = await req.get(`/api/class-codes/test-class/question`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});
