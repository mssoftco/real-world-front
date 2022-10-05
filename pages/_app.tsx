import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getLayout } from '@/utils/layout';
import '../styles/globals.css';

const queryClient = new QueryClient();

function ArvanApp({ Component, pageProps }: AppProps) {
  const Layout = getLayout<any>(Component);

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>Arvan Cloud - Dashboard</title>
        <meta name='description' content='frycto' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default ArvanApp;
