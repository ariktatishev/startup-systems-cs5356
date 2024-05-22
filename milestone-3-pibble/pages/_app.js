import "../styles/globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ClerkProvider>
      <Head>
        <title>PibblePet</title>
        <meta name="description" content="PibblePet" />
      </Head>
      <NavBar />
      <div className="pt-12">
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
      </div>
      <Footer />
    </ClerkProvider>
  );
}

export default MyApp;
