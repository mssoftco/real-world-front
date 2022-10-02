import React from 'react';
import Head from 'next/head';
import Layout from '@/components/layouts/Public';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { routes } from '@/constants/defaults';
import { useToken } from '@/hooks/useToken';
import styles from '@/styles/Home.module.css';
import Button from '@/components/inputs/Button';

const HomePage = () => {
  const { isLoading, isLogin, username, setToken } = useToken();
  const logout = () => {
    setToken('');
  };
  return (
    <>
      <Head>
        <title>Arvan Cloud | Dashboard</title>
      </Head>
      <Box display={'flex'} flexDir={'column'} textAlign={'center'}>
        <Heading color={'gray.600'} mb={'20px'}>
          Arvan Cloud Dashboard
        </Heading>
        {isLoading ? (
          <div>
            <Spinner thickness={'4px'} size={'xl'} />
          </div>
        ) : isLogin ? (
          <>
            <Text fontSize={'x-large'}>
              Welcome <b>{username}</b> &#128515;
            </Text>
            <Link href={routes.ARTICLES}>
              <a className={styles.button}>Show Post List</a>
            </Link>
            <Button onClick={logout}>logout</Button>
          </>
        ) : (
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
        )}
      </Box>
    </>
  );
};

HomePage.Layout = Layout;

export default HomePage;
