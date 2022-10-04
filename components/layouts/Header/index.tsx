import React from 'react';
import Link from 'next/link';
import { routes } from '@/constants/defaults';
import { Box, Flex, Heading, Text, useMediaQuery, useToast } from '@chakra-ui/react';
import { useToken } from '@/hooks/useToken';
import Loading from '@/components/Loading';
import Button from '@/components/inputs/Button';
import Router from 'next/router';

function Header() {
  const { isLoading, isLogin, username, setToken } = useToken();
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const toast = useToast({ status: 'success', duration: 6000, isClosable: true });

  const logout = () => {
    setToken('');
    Router.push(routes.HOME).then(() => toast({ title: 'Logout User', description: 'User successfully Logout', status: 'info' }));
  };

  if (isLoading) return <Loading thickness={'2px'} size={'md'} />;

  return (
    <Box as={'header'} bg={'gray.700'} color={'white'} h={'100%'} px={5} fontWeight={500}>
      <Flex alignItems={'center'} justifyContent={'space-between'} h={'100%'}>
        <Flex alignItems={'center'} gap={'5'}>
          <Link href={routes.HOME}>
            <a>
              <Heading as={'h1'} fontSize={24}>
                {isLargerThan800 ? 'Arvan Challenge' : 'A'}
              </Heading>
            </a>
          </Link>
          {username && (
            <Text as={'span'}>
              Welcome <b>{username}</b>
            </Text>
          )}
        </Flex>
        <Flex as={'nav'}>
          <Flex as={'ul'} gap={5}>
            {isLogin ? (
              <Button as={'a'} cursor={'pointer'} colorScheme={'cyan'} variant={'outline'} onClick={logout}>
                Logout
              </Button>
            ) : (
              <>
                <Link href={routes.LOGIN}>
                  <a>Login</a>
                </Link>
                <Link href={routes.REGISTER}>
                  <a>Register</a>
                </Link>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
