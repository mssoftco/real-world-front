import React from 'react';
import Head from 'next/head';
import Login from '@/components/Login';
import Layout from '@/components/layouts/Public';

function LoginPage() {
  return (
    <>
      <Head>
        <title>Arvan Cloud | Login</title>
      </Head>
      <Login />
    </>
  );
}

LoginPage.Layout = Layout;

export default LoginPage;
