import React, { useState } from 'react';
import { Box, Checkbox, CheckboxGroup, Flex, Heading, Input, Textarea, useToast } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { articleForEditorDefaultValues as defaultValues } from '@/constants/reactHookFormDefaultData';
import { useCreateArticle, useUpdateArticle } from '@/hooks/articles';
import { useGetTags } from '@/hooks/tags';
import Router from 'next/router';
import { routes } from '@/constants/defaults';
import { ArticleEditorResponseErrors, ArticleForEditor, ArticleType } from '@/types/article';
import { useQueryClient } from '@tanstack/react-query';
import InputForm from '@/components/inputs/InputForm';
import Button from '@/components/inputs/Button';
import styles from '@/components/Articles/Editor/index.module.css';
import Loading from '@/components/Loading';

/*
 TODO - Dynamic import for create and update
 TODO - implementation add new tag to list
*/

function Editor({ articleData }: { articleData?: ArticleType }) {
  const isUpdate = !!articleData;
  let defaultArticleNeeded: ArticleForEditor = defaultValues;

  if (isUpdate && articleData && articleData?.article && articleData?.article?.title) {
    defaultArticleNeeded = {
      article: {
        title: articleData.article.title,
        description: articleData.article.description,
        body: articleData.article.body
      }
    };
  }
  const toast = useToast({ status: 'success', duration: 6000, isClosable: true });
  const [errorsResponse, setErrorsResponse] = useState<ArticleEditorResponseErrors>({});
  const { register, handleSubmit, reset , formState: { errors } } = useForm<ArticleForEditor>({ defaultValues:defaultArticleNeeded||defaultValues }); // prettier-ignore
  const queryClient = useQueryClient();

  const { isLoading: isLoadingGetTags, data: tagsData } = useGetTags();
  const newArticle = useCreateArticle();
  const onSubmitCreate: SubmitHandler<ArticleForEditor> = data =>
    newArticle.mutate(data, {
      onSuccess: () => {
        reset();
        setErrorsResponse({});
        queryClient?.invalidateQueries(['articles']);
        Router.push(routes.ARTICLES).then(() => {
          toast({ title: 'Create Article', description: 'Article successfully added' });
        });
      },
      onError: (error: any) => {
        setErrorsResponse(error);
        toast({ title: 'Create Article Error', description: error?.message, status: 'error' });
      }
    });
  const UpdateArticle = useUpdateArticle();

  const onSubmitUpdate: SubmitHandler<ArticleForEditor> = article => {
    const slug = articleData?.article?.slug || '';
    UpdateArticle.mutate(
      { article, slug },
      {
        onSuccess: () => {
          reset();
          setErrorsResponse({});
          queryClient?.invalidateQueries(['articles']);
          queryClient?.invalidateQueries(['article', slug]);
          Router.push(routes.ARTICLES).then(() => {
            toast({ title: 'Update Article', description: 'Article successfully updated' });
          });
        },
        onError: (error: any) => {
          setErrorsResponse(error);
          toast({ title: 'Update Article Error', description: '', status: 'error' });
        }
      }
    );
  };

  return (
    <Box w={'100%'} p={'15px'}>
      <Heading as={'h1'} m={'6px 0 13px'}>
        {`${isUpdate ? 'Update' : 'New'} Article`}
      </Heading>
      <form onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}>
        <Flex className={styles.inputsWrapper} gap={'15px'}>
          <Flex className={styles.mainWrapper}>
            <InputForm label='Title' isErrorForm={!!errors.article?.title} errorsResponse={errorsResponse['title']}>
              <Input type='text' bg={'white'} placeholder='Title' {...register('article.title', { required: true })} />
            </InputForm>
            <InputForm label='Description' isErrorForm={!!errors.article?.description} errorsResponse={errorsResponse['description']}>
              <Input type='text' bg={'white'} placeholder='Description' {...register('article.description', { required: true })} />
            </InputForm>
            <InputForm label='body' isErrorForm={!!errors.article?.body} errorsResponse={errorsResponse['body']}>
              <Textarea rows={10} bg={'white'} {...register('article.body', { required: true })} />
            </InputForm>
          </Flex>
          <Flex className={styles.tagsWrapper}>
            <InputForm label='Tags' isErrorForm={false} errorsResponse={errorsResponse['description']}>
              <Input type='text' bg={'white'} placeholder='New Tag' />
            </InputForm>
            <Flex flexDir={'column'} mb={'19px'}>
              <CheckboxGroup defaultValue={articleData?.article?.tagList}>
                <Flex className={styles.tagList} flexDir={'column'} p={'15px'} borderRadius={'5px'} border={'1px solid #e2e8f0'}>
                  {isLoadingGetTags ? (
                    <Loading thickness={'2px'} size={'lg'} />
                  ) : (
                    tagsData?.tags?.map(tag => (
                      <Checkbox key={tag} value={tag} {...register('article.tagList')}>
                        {tag}
                      </Checkbox>
                    ))
                  )}
                </Flex>
              </CheckboxGroup>
            </Flex>
          </Flex>
        </Flex>
        <div>
          <Button isLoading={newArticle.isLoading} loadingText={'Submitting'} w={'180px'} py={2} type='submit'>
            Submit
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default Editor;
