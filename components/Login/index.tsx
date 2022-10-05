import React, { useState } from 'react';
import { Box, Heading, Input, Text, useToast } from '@chakra-ui/react';
import Button from '@/components/inputs/Button';
import { useLoginUser } from '@/hooks/users';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserForLogin, UserLoginResponseErrors } from '@/types/user';
import InputForm from '@/components/inputs/InputForm';
import Link from 'next/link';
import { routes } from '@/constants/defaults';
import Router from 'next/router';
import { userForLoginDefaultValues as defaultValues } from '@/constants/reactHookFormDefaultData';
import { useToken } from '@/hooks/useToken';
import { getRedirectTo } from '@/utils/redirect';

function Login() {
  const { setTokenWithStorage } = useToken();
  const toast = useToast({ status: 'success', duration: 6000, isClosable: true });

  const [errorsResponse, setErrorsResponse] = useState<UserLoginResponseErrors>({});
  const { register, handleSubmit, reset , formState: { errors } } = useForm<UserForLogin>({ defaultValues }); // prettier-ignore

  const loginUser = useLoginUser();
  const onSubmit: SubmitHandler<UserForLogin> = data =>
    loginUser.mutate(data, {
      onSuccess: response => {
        reset();
        setErrorsResponse({});
        setTokenWithStorage(response?.user?.token);
        const redirectPath = getRedirectTo();
        Router.push(redirectPath).then(() => toast({ title: 'User Logged in', description: 'User successfully Logged in' }));
      },
      onError: (error: any) => {
        const errors: UserLoginResponseErrors = { ...error };
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
        <InputForm label='Email' isErrorForm={!!errors.user?.email} errorsResponse={errorsResponse['email']}>
          <Input type='email' bg={'white'} {...register('user.email', { required: true, pattern: /^\S+@\S+$/i })} />
        </InputForm>
        <InputForm label='Password' isErrorForm={!!errors.user?.password} errorsResponse={errorsResponse['password']}>
          <Input type='password' bg={'white'} {...register('user.password', { required: true })} />
        </InputForm>
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
