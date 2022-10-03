import React from 'react';
import Link from 'next/link';
import { routes } from '@/constants/defaults';
import { Box, Flex, Heading, Text, useToast } from '@chakra-ui/react';
import { useToken } from '@/hooks/useToken';
import Loading from '@/components/Loading';
import Button from '@/components/inputs/Button';
import Router from 'next/router';
import { ToastStatusType } from '@/types/tools';

function Header() {
  const { isLoading, isLogin, username, setToken } = useToken();
  const toast = useToast();
  const toasty = ([title, description, status]: [string, string, ToastStatusType]) => {
    toast({ title, description, status, duration: 6000, isClosable: true });
  };
  const logout = () => {
    setToken('');
    Router.push(routes.HOME).then(() => {
      toasty(['Logout User', 'User successfully Logout', 'info']);
    });
  };
  if (isLoading) return <Loading />;

  return (
    <Box as={'header'} bg={'gray.700'} color={'white'} h={'100%'} px={5} fontWeight={500}>
      <Flex alignItems={'center'} justifyContent={'space-between'} h={'100%'}>
        <Flex alignItems={'center'} gap={'5'}>
          <Link href={routes.HOME}>
            <a>
              <Heading as={'h1'} fontSize={24}>
                Arvan Challenge
              </Heading>
            </a>
          </Link>
          <Text as={'span'}>
            Welcome <b>{username || 'Guest'}</b>
          </Text>
        </Flex>
        <Flex as={'nav'}>
          <Flex as={'ul'} gap={5}>
            {isLogin ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              <>
                <Link href={routes.LOGIN}>
                  <a>login</a>
                </Link>
                <Link href={routes.REGISTER}>
                  <a>register</a>
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
