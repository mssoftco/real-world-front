import React from 'react';
import Register from '@/components/Register';
import Head from 'next/head';
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
