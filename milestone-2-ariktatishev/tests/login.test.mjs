import supertest from "supertest";
import { signIn } from "./utils.mjs";

/*
CS5356 1b. Authentication

Below are unit tests to review your NextAuth configuration. 
Once you have it configured correctly, all the tests will pass.
Run the tests with `npm run test-login`

The only requirement for our prototype authentication system is
that users can sign in with only a username and no password
necessary. The user's name should then be provided within
the session.

*/

describe("login endpoints", () => {
    let req;
    beforeEach(() => {
        req = supertest.agent('http://localhost:3000')
    });
    afterEach(async () => {
        await req.post('/api/reset')
    })

    it("GET /api/auth/session returns 200 when user session is created", async () => {
        let response = await signIn(req, 'user123')

        response = await req.get('/api/auth/session')
        expect(response.statusCode).toBe(200);
        expect(response.body?.user?.name).toBe('user123');
    });

    it("GET /api/auth/session redirects to login when request is missing username field", async () => {
        let response = await signIn(req, null)

        expect(response.statusCode).toBe(302);
    });

});