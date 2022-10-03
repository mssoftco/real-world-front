import React from 'react';
import { useArticles } from '@/hooks/articles';
import { Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tag, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { headTableData } from '@/constants/defaults';
import { Article } from '@/types/article';
import Loading from '@/components/Loading';
import { ChevronDownIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import styles from '@/components/Articles/index.module.css';

function Articles() {
  const queryString = '?limit=10&offset=0';
  const { data: articlesData, isLoading } = useArticles(queryString);

  const formatDate = (date: string) => new Date(date)?.toDateString()?.split(' ')?.slice(1).join(' ');
  const renderHeadTable = () => headTableData?.map(title => <Th key={title}>{title}</Th>);
  const renderTags = (tagList: string[]) => tagList?.map(tag => <Tag key={tag} variant='solid' m={1} colorScheme='teal'>{tag}</Tag>); // prettier-ignore
  const renderMenu = () => (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon style={{ width: '20px' }} />}>
        <EllipsisHorizontalIcon style={{ width: '20px' }} />
      </MenuButton>
      <MenuList>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </MenuList>
    </Menu>
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
              {articlesData?.articles?.map(({ title, author: { username }, tagList, body, createdAt }: Article, index: number) => (
                <Tr key={title + username} className={styles.row}>
                  <Td>{index + 1}</Td>
                  <Td>{title}</Td>
                  <Td>{username}</Td>
                  <Td>{renderTags(tagList)}</Td>
                  <Td>{body.slice(0, 20)}</Td>
                  <Td>{formatDate(createdAt)}</Td>
                  <Td>{renderMenu()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Flex>
  );
}

export default Articles;
