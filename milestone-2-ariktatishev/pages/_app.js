import "../styles/globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div>
      <SessionProvider session={session}>
        <Head>
          <title>Questionify Home</title>
          <meta name="description" content="Questionify homepage" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
          ></link>
        </Head>
        <NavBar />
        <div className="pt-12">
          <Component {...pageProps} />
        </div>
        <Footer />
      </SessionProvider>
    </div>
  );
}

export default MyApp;
