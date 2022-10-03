import React, { useState } from 'react';
import { Box, Heading, Text, useToast } from '@chakra-ui/react';
import Button from '@/components/inputs/Button';
import { useLoginUser } from '@/hooks/useLoginUser';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserForLogin, UserLoginResponsiveErrors } from '@/types/user';
import InputForm from '@/components/inputs/InputForm';
import Link from 'next/link';
import { routes } from '@/constants/defaults';
import { useAtom } from 'jotai';
import { tokenAtom } from '@/atoms/user';
import Router from 'next/router';
import { userForLoginDefaultValues as defaultValues } from '@/constants/reactHookFormDefaultData';

function Login() {
  const [, setToken] = useAtom(tokenAtom);
  const toast = useToast({ status: 'success', duration: 6000, isClosable: true });

  const [errorsResponse, setErrorsResponse] = useState<UserLoginResponsiveErrors>({});
  const { register, handleSubmit, reset , formState: { errors } } = useForm<UserForLogin>({ defaultValues }); // prettier-ignore

  const loginUser = useLoginUser();
  const onSubmit: SubmitHandler<UserForLogin> = data =>
    loginUser.mutate(data, {
      onSuccess: response => {
        reset();
        setErrorsResponse({});
        setToken(response?.user?.token);
        Router.push(routes.HOME).then(() => toast({ title: 'User Logged in', description: 'User successfully Logged in' }));
      },
      onError: (error: any) => {
        let errors: UserLoginResponsiveErrors = { ...error };
        let errorDescription = '';
        if (error.hasOwnProperty('email or password')) {
          const errorKey = Object.keys(errors);
          const errorValue = errors['email or password'] || [''];
          errorDescription = `${errorKey.join()} ${errorValue.join()}`;
          delete errors['email or password'];
          errors.email = errorValue;
          errors.password = errorValue;
        }
        setErrorsResponse(errors);
        toast({ title: 'Login Error', description: [errorDescription], status: 'error' });
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
        <Button isLoading={loginUser.isLoading} loadingText='Logging in' w={'100%'} mb={2} type='submit'>
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
