import { useState, useEffect } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { initEmailJS } from '@/lib/email';
import { GoogleTagManager } from '@next/third-parties/google';
import CookieBanner from '@/components/CookieBanner';
import Script from 'next/script'; // 1. Import Next.js Script component

export default function App({ Component, pageProps }: AppProps) {
  // null = no choice made yet, true = accepted, false = declined
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    initEmailJS();

    // Check if the user already made a choice in a previous session
    const storedConsent = localStorage.getItem('cookieConsent');
    if (storedConsent === 'granted') {
      setConsentGiven(true);
    } else if (storedConsent === 'denied') {
      setConsentGiven(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'granted');
    setConsentGiven(true);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'denied');
    setConsentGiven(false);
  };

  return (
    <>
      {/* Only load tracking scripts IF consent is explicitly given */}
      {consentGiven === true && (
        <>
          {/* Google Tag Manager */}
          <GoogleTagManager gtmId="GTM-N9ZX6F6L" /> {/* Replace with your ID */}

          {/* ShinyStat Analytics */}
          <Script
            id="ShinyStat"
            src="//codice.shinystat.com/cgi-bin/getcod.cgi?USER=SS-51204917-cd327"
            strategy="afterInteractive"
          />
        </>
      )}

      <Layout>
        <Component {...pageProps} />
      </Layout>

      {/* Show the banner IF no choice has been made yet */}
      {consentGiven === null && (
        <CookieBanner onAccept={handleAccept} onDecline={handleDecline} />
      )}
    </>
  );
}