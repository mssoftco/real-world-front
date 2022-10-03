import React from 'react';
import Head from 'next/head';
import Register from '@/components/Register';
import Layout from '@/components/layouts/Public';
import { useToken } from '@/hooks/useToken';
import Loading from '@/components/Loading';
import Router from 'next/router';
import { routes } from '@/constants/defaults';

function RegisterPage() {
  const { isLoading, isLogin } = useToken();
  if (isLoading) return <Loading />;
  if (isLogin) Router.push(routes.HOME).then();

  return (
    <>
      <Head>
        <title>Arvan Cloud | Register</title>
      </Head>
      {isLogin ? <Loading /> : <Register />}
    </>
  );
}

RegisterPage.Layout = Layout;

export default RegisterPage;
