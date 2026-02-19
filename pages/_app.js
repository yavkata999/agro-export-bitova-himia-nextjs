import Head from "next/head";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import AppShellResponsive from "@/components/AppShell";
import { CookieBanner } from "@/components/CookieBanner";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Script id="ShinyStat" src="//codice.shinystat.com/cgi-bin/getcod.cgi?USER=SS-51204917-cd327" />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      <AppShellResponsive>
        <CookieBanner />
        <Component {...pageProps} />
      </AppShellResponsive>
    </>
  );
}

export default App;
