import React from 'react';
import Head from 'next/head';
import Layout from '@/components/layouts/Dashboard';
import { Box, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { routes } from '@/constants/defaults';
import { useToken } from '@/hooks/useToken';
import Loading from '@/components/Loading';

const HomePage = () => {
  const { isLoading, isLogin } = useToken();

  return (
    <>
      <Head>
        <title>Arvan Cloud | Dashboard</title>
      </Head>
      <Box minH={'60vh'} display={'flex'} flexDir={'column'} textAlign={'center'} justifyContent={'center'}>
        <Heading color={'gray.600'} mb={'20px'}>
          Arvan Cloud Dashboard
        </Heading>
        {isLoading ? (
          <div>
            <Loading />
          </div>
        ) : (
          !isLogin && (
            <Text fontSize={'x-large'}>
              Please{' '}
              <Link href={routes.LOGIN}>
                <a>
                  <b style={{ color: 'blue' }}>Sign in</b>
                </a>
              </Link>{' '}
              or{' '}
              <Link href={routes.REGISTER}>
                <a>
                  <b style={{ color: 'blue' }}>Sign up</b>
                </a>
              </Link>{' '}
              to continue
            </Text>
          )
        )}
      </Box>
    </>
  );
};

HomePage.Layout = Layout;

export default HomePage;
