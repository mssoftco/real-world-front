import React from 'react';
import Head from 'next/head';
import EditArticle from '@/components/Articles/Editor';
import Layout from '@/components/layouts/Dashboard';
import { useRouter } from 'next/router';
import { useGetArticleBySlug } from '@/hooks/articles';
import { Skeleton } from '@chakra-ui/react';

function EditArticlePage() {
  const {
    query: { slug }
  } = useRouter();
  const { isLoading, data } = useGetArticleBySlug(slug as string);
  return (
    <>
      <Head>
        <title>Arvan Cloud | Edit Article</title>
      </Head>
      {isLoading ? <EditSkeleton /> : <EditArticle articleData={data} />}
    </>
  );
}

/* TODO - better skeleton :)*/
function EditSkeleton() {
  return (
    <div style={{ padding: '50px' }}>
      <Skeleton m={10} h={'50px'} />
      <Skeleton m={10} h={'50px'} />
      <Skeleton m={10} h={'50px'} />
      <Skeleton m={10} h={'50px'} />
      <Skeleton m={10} h={'50px'} />
    </div>
  );
}
EditArticlePage.Layout = Layout;
export default EditArticlePage;
