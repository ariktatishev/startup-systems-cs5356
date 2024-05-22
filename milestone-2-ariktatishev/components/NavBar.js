import Link from "next/link";
import { signIn, signOut } from 'next-auth/react'
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { data: session, status } = useSession()
  return (
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation"
      style={{ borderBottom: "1px solid lightgrey" }}
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          QUESTIONIFY
        </a>
      </div>
      <Link href="/app/home">
        {/* CS5356 TODO 1a. Navigation

        Create a new page at /app/home to be the Instructor Home Page.
        This page should only be visible by signed in users.
        If a signed-out user tries to access the page, they should
        be redirected to the login page to complete signing in.

        The Instructor Home Page should have 2 parts, similar to your 
        wireframe.
        1. The page should contain one section to display a short form
        allowing them to create a class code by making a 
        POST /api/class-codes (Completed in step 3a). When a class code has been created, this 
        page should re-fetch the user's class codes.
        
        2. The page should contain another section to display a list or
        table of the user's class codes. When the page loads for the first
        time, make a GET /api/class-codes (Completed in step 3a) to fetch the list of class codes.
         */}
        <a className="navbar-item">Instructor Home</a>
      </Link>
      <div className="navbar-menu">
        <div className="navbar-start"></div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            {/* CS5356 TODO 1b. Authentication

              Finish configuring NextAuth by editing pages/api/auth/[...nextAuth].js.
              Then get the user's session and check if they are signed in.
              https://next-auth.js.org/getting-started/client#usesession

              Display a button here to "Sign In" in if the user is not currently signed in,
              i.e they don't have an active session. It should send the user to /api/auth/signin
              https://next-auth.js.org/getting-started/client#signin

              If the user is signed in and they have an active session, the button 
              should display "Sign out", and it should direct the user to the /api/auth/signout page
              https://next-auth.js.org/getting-started/client#signout
             */
              ! session ? (
                <button onClick={() => signIn()} className="button is-primary">
                  Sign In
                </button>
              ) : (
                <>
                  <button onClick={() => signOut()} className="button">
                    Sign Out
                  </button>
                </>
              ) 
              }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
