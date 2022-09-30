import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <title>Arvan Cloud - Dashboard</title>
        <meta name='description' content='frycto' />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      </Head>
      <ChakraProvider>
      <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
