import React, { useState } from 'react';
import { useGetArticles, useDeleteArticle } from '@/hooks/articles';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { headTableData, routes } from '@/constants/defaults';
import { Article } from '@/types/article';
import Loading from '@/components/Loading';
import { ChevronDownIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { useQueryClient } from '@tanstack/react-query';
import styles from '@/components/Articles/index.module.css';
import Link from 'next/link';

/*
 TODO - implementation Pagination of ReactQuery
 TODO - Code Splitting - create and move delete & alert & table component
 TODO - Dynamic import for delete component
 TODO - add skeleton
*/

function Articles() {
  const queryString = '';
  const { data: articlesData, isLoading } = useGetArticles(queryString);
  const deleteUser = useDeleteArticle();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement & HTMLButtonElement>;
  const [userSelected, setUserSelected] = useState<Article>();
  const queryClient = useQueryClient();
  const formatDate = (date: string) => new Date(date)?.toDateString()?.split(' ')?.slice(1).join(' ');
  const toast = useToast({ status: 'success', duration: 6000, isClosable: true });
  const handleOpenDeleteAlert = (article: Article) => {
    setUserSelected(article);
    onOpen();
  };
  const handleDeleteArticle = () => {
    const slug = userSelected?.slug || '';
    deleteUser.mutate(slug, {
      onSuccess: () => {
        queryClient?.invalidateQueries(['articles']);
        toast({ title: 'Delete Article', description: 'Article successfully deleted' });
      },
      onError: (error: any) => {
        toast({ title: 'Delete Article Error', description: error?.message, status: 'error' });
      }
    });
    onClose();
  };

  const renderHeadTable = () =>
    headTableData?.map(title => (
      <Th key={title} pl={'10px'}>
        {title}
      </Th>
    ));
  const renderTags = (tagList: string[]) => tagList?.map(tag => <Tag key={tag} variant='solid' m={1} colorScheme='teal'>{tag}</Tag>); // prettier-ignore
  const renderMenu = (article: Article) => (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon style={{ width: '20px' }} />}>
        <EllipsisHorizontalIcon style={{ width: '20px' }} />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <Link href={`${routes.EDIT_ARTICLE}/${encodeURIComponent(article?.slug)}`}>
            <a style={{ width: '100%' }}>Edit</a>
          </Link>
        </MenuItem>
        <MenuItem onClick={() => handleOpenDeleteAlert(article)}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
  const renderAlert = () => (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Article
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure to delete <b>{userSelected?.title ? userSelected?.title : ''}</b> Article?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={handleDeleteArticle} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  return (
    <Flex flexDir={'column'}>
      <Heading as={'h2'} m={5}>
        All Posts
      </Heading>
      {isLoading ? (
        <Loading />
      ) : (
        <TableContainer overflow={'scroll'} whiteSpace={'normal'}>
          <Table fontWeight={400} variant='simple'>
            <Thead>
              <Tr>{renderHeadTable()}</Tr>
            </Thead>
            <Tbody>
              {articlesData?.articles?.map((article: Article, index: number) => {
                const {
                  title,
                  author: { username },
                  tagList,
                  body,
                  createdAt
                } = article;
                return (
                  <Tr key={title + username} className={styles.row}>
                    <Td textAlign={'center'}>{index + 1}</Td>
                    <Td>{title}</Td>
                    <Td>{username}</Td>
                    <Td>{renderTags(tagList)}</Td>
                    <Td>{body.slice(0, 20)}</Td>
                    <Td>{formatDate(createdAt)}</Td>
                    <Td>{renderMenu(article)}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {renderAlert()}
    </Flex>
  );
}

export default Articles;
