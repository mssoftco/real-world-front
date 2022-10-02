import React from 'react';
import Head from 'next/head';
import Layout from '@/components/layouts/Dashboard';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Arvan Cloud | Dashboard</title>
      </Head>
      <div>home</div>
    </>
  );
};

HomePage.Layout = Layout;

export default HomePage;
