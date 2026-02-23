import { useEffect } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { initEmailJS } from '@/lib/email';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initEmailJS();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}