import React from "react";
import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import AppShellResponsive from "@/components/AppShell";
import CookieConsent from "react-cookie-consent";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

function App({ Component, pageProps }) {
  return (
    <MantineProvider>
      <Head>
        <title>Битова химия - Биологични препарати за почистване на дома</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <AppShellResponsive>
        <CookieConsent
          acceptOnScroll={true}
          location="bottom"
          buttonText="Разбирам"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        >
          Този уебсайт използва бисквитки. Запознайте се с нашата &quot;Политика
          за защита на личните данни&quot; като посетите страницата ни.
        </CookieConsent>
        <Script
          id="ShinyStat"
          src="//codice.shinystat.com/cgi-bin/getcod.cgi?USER=SS-51204917-cd327"
        />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <Component {...pageProps} />
      </AppShellResponsive>
    </MantineProvider>
  );
}

export default App;
