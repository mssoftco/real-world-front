import React from 'react';
import Head from 'next/head';
import Articles from '@/components/Articles';
import Layout from '@/components/layouts/Dashboard';

function ArticlesPage() {
  return (
    <>
      <Head>
        <title>Real World | Posts</title>
      </Head>
      <Articles />
    </>
  );
}

ArticlesPage.Layout = Layout;

export default ArticlesPage;
