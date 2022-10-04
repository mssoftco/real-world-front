import React from 'react';
import Head from 'next/head';
import EditArticle from '@/components/Articles/Editor';
import Layout from '@/components/layouts/Dashboard';

function EditArticlePage() {
  return (
    <>
      <Head>
        <title>Arvan Cloud | Edit Article</title>
      </Head>
      <EditArticle />
    </>
  );
}

EditArticlePage.Layout = Layout;
export default EditArticlePage;
