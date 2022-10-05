import React from 'react';
import Head from 'next/head';
import CreateArticle from '@/components/Articles/Editor';
import Layout from '@/components/layouts/Dashboard';

function CreateArticlePage() {
  return (
    <>
      <Head>
        <title>Arvan Cloud | Create Article</title>
      </Head>
      <CreateArticle />
    </>
  );
}

CreateArticlePage.Layout = Layout;
export default CreateArticlePage;
