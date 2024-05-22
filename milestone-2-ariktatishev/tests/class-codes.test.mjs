import request from "supertest";
import { signIn } from "./utils.mjs";

/*
CS5356 TODO 2b. API Tests

Pre-req: `database.test.mjs` & `login.test.mjs` should be passing before working
on this integration test.

Run `npm run test-class-codes` to test this file.

Below are integration tests that make requests to a running 
NextJS server, to test all the APIs to manage Class Codes.

To get these to pass, add APIs to `pages/api/` to respond to 
these requests. Use the user's server side session to check 
if they are signed in. And import the db from `services/database.mjs`
to get access to the data.

Read through each test to understand what it is trying to do,
and what is expected.
*/

describe("Class Code Endpoints", () => {
  let req;
  beforeEach(() => {
    req = request.agent('http://localhost:3000');
  });

  afterEach(async () => {
    await req.post('/api/reset').send()
  });

  it("GET /api/class-codes returns 200 with empty classes for signed in users", async () => {
    await signIn(req, 'user123')

    const response = await req.get("/api/class-codes");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveSize(0)
  });

  it("GET /api/class-codes returns 401 when user is not logged in", async () => {
    const response = await req.get("/api/class-codes");
    expect(response.statusCode).toBe(401);
  });

  it("POST /api/class-codes returns 400 when name field is missing", async () => {
    await signIn(req, 'user123')

    const response = await req
      .post("/api/class-codes")
      .send({ notAProperty: "foobar" });
    expect(response.statusCode).toBe(400);
  });

  it("POST /api/class-codes returns 401 when user is not logged in", async () => {
    const response = await req
      .post("/api/class-codes")
      .send({ notAProperty: "foobar" });
    expect(response.statusCode).toBe(401);
  });

  it("POST /api/class-codes returns 201 when a class is created for current user", async () => {
    await signIn(req, 'user-123')

    const response = await req
      .post("/api/class-codes")
      .send({ id: "test-class" });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(
      jasmine.objectContaining({ id: "test-class" })
    );
  });

  it("GET /api/class-codes returns 200 with current users classes", async () => {
    // Sign in as user123 and create test-class-123
    await signIn(req, 'user123')

    let response = await req
      .post("/api/class-codes")
      .send({ id: "test-class-123" });

    // Sign in as user456 and create test-class-456
    await signIn(req, 'user456')
    response = await req.post("/api/class-codes").send({ id: "test-class-456" });

    // Check that we only receive the class from the currently signed in user
    response = await req.get("/api/class-codes");
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toEqual(
      jasmine.objectContaining({ id: "test-class-456" })
    );
  });
});
