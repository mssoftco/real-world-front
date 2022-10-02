import React from 'react';
import Head from 'next/head';
import Register from '@/components/Register';
import Layout from '@/components/layouts/Public';

function RegisterPage() {
  return (
    <>
      <Head>
        <title>Arvan Cloud | Register</title>
      </Head>
      <Register />
    </>
  );
}

RegisterPage.Layout = Layout;

export default RegisterPage;
