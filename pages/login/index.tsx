import React from 'react';
import Head from 'next/head';
import Login from '@/components/Login';
import Layout from '@/components/layouts/Public';
import { useToken } from '@/hooks/useToken';
import Loading from '@/components/Loading';
import Router from 'next/router';
import { routes } from '@/constants/defaults';

/* TODO - add skeleton*/

function LoginPage() {
  const { isLoading, isLogin } = useToken();
  if (isLoading) return <Loading />;
  if (isLogin) Router.push(routes.HOME).then();

  return (
    <>
      <Head>
        <title>Arvan Cloud | Login</title>
      </Head>
      {isLogin ? <Loading /> : <Login />}
    </>
  );
}

LoginPage.Layout = Layout;

export default LoginPage;
