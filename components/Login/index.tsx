import React, { useState } from 'react';
import { Box, Heading, Text, useToast } from '@chakra-ui/react';
import Button from '@/components/inputs/Button';
import { useLoginUser } from '@/hooks/useLoginUser';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserForLogin } from '@/types/user';
import InputForm from '@/components/inputs/InputForm';
import Link from 'next/link';
import { ToastStatusType } from '@/types/tools';
import { routes } from '@/constants/defaults';
import { useAtom } from 'jotai';
import { tokenAtom } from '@/atoms/user';
import Router from 'next/router';

const defaultValues: UserForLogin = {
  user: {
    email: '',
    password: ''
  }
};

function Login() {
  const [, setToken] = useAtom(tokenAtom);

  const [errorsResponse, setErrorsResponse] = useState<{ email?: string[]; password?: string[] }>({});
  const { register, handleSubmit, reset , formState: { errors } } = useForm<UserForLogin>({ defaultValues }); // prettier-ignore

  const toast = useToast();
  const toasty = ([title, description, status]: [string, string, ToastStatusType]) => {
    toast({ title, description, status, duration: 6000, isClosable: true });
  };

  const loginUser = useLoginUser();
  const onSubmit: SubmitHandler<UserForLogin> = data =>
    loginUser.mutate(data, {
      onSuccess: response => {
        reset();
        setErrorsResponse({});
        setToken(response?.user?.token);
        Router.push(routes.HOME).then(() => {
          toasty(['Login User', 'User successfully Login', 'success']);
        });
      },
      onError: (error: any) => {
        const errorDescription = Object?.entries(error).join(' ');
        let newError = {};
        if (errorDescription.includes('email')) newError = { ...newError, email: ['is invalid'] };
        if (errorDescription.includes('password')) newError = { ...newError, password: ['is invalid'] };
        setErrorsResponse(newError);
        toasty(['Error Login User', errorDescription, 'error']);
      }
    });

  return (
    <Box borderRadius={5} bg={'gray.100'} p={6} w={'100%'} maxW={450}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading color={'gray'} textAlign={'center'}>
          Login
        </Heading>
        <InputForm
          name='email'
          label='Email'
          type='email'
          isErrorForm={!!errors.user?.email}
          errorsResponse={errorsResponse['email']}
          {...{ register }}
          pattern={/^\S+@\S+$/i}
        />
        <InputForm
          name='password'
          label='Password'
          type='password'
          isErrorForm={!!errors.user?.password}
          errorsResponse={errorsResponse['password']}
          {...{ register }}
        />
        <Button w={'100%'} mb={2} type='submit'>
          Login
        </Button>
        <div>
          <Text display={'inline-block'} pr={1}>
            Don’t have account?
          </Text>
          <Link href={routes.REGISTER}>
            <a style={{ fontWeight: '600' }}>Register Now</a>
          </Link>
        </div>
      </form>
    </Box>
  );
}

export default Login;
