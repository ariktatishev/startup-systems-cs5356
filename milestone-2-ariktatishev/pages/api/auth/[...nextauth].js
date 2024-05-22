// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/*
CS5356 TODO 1b. Authentication

Add sign in to your app by setting up NextAuth.

Define a CredentialsProvider with a username, and authorize the user
when they sign in by creating a user token that sets the user name
to be the provided username.

Note - For our prototype authentication system, we only need the username
and no password is required from the user.

See here for an example - https://next-auth.js.org/providers/credentials#example---username--password
*/

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter your username" }
      },
      authorize: async (credentials) => {
        if (credentials.username) {
          // For this prototype, any non-empty username is authorized
          // In a real app, you'd look up the user in your database here
          return { id: `${Math.random()}`, name: credentials.username, email: credentials.username};
        }
        // Return null if user data could not be retrieved
        return null;
      }
    }),
  ], // <-- Fill this in.
  session: {
    jwt: true,
  },
};

export default (req, res) => NextAuth(req, res, options);
