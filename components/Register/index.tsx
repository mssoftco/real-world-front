import React, { useState } from 'react';
import { Box, Heading, Input, Text, useToast } from '@chakra-ui/react';
import Button from '@/components/inputs/Button';
import { useCreateUser } from '@/hooks/users';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserForRegister, UserRegisterResponseErrors } from '@/types/user';
import InputForm from '@/components/inputs/InputForm';
import Link from 'next/link';
import { routes } from '@/constants/defaults';
import Router from 'next/router';
import { userForRegisterDefaultValues as defaultValues } from '@/constants/reactHookFormDefaultData';
import { useToken } from '@/hooks/useToken';
import { getRedirectTo } from '@/utils/redirect';

function Register() {
  const { setTokenWithStorage } = useToken();
  const toast = useToast({ status: 'success', duration: 6000, isClosable: true });

  const [errorsResponse, setErrorsResponse] = useState<UserRegisterResponseErrors>({});
  const { register, handleSubmit, reset , formState: { errors } } = useForm<UserForRegister>({ defaultValues }); // prettier-ignore

  const newUser = useCreateUser();
  const onSubmit: SubmitHandler<UserForRegister> = data =>
    newUser.mutate(data, {
      onSuccess: response => {
        reset();
        setErrorsResponse({});
        setTokenWithStorage(response?.user?.token);
        const redirectPath = getRedirectTo();
        Router.push(redirectPath).then(() => toast({ title: 'Create User', description: 'User successfully added' }));
      },
      onError: (error: any) => {
        setErrorsResponse(error);
        toast({ title: 'Create User Error', description: '', status: 'error' });
      }
    });

  return (
    <Box borderRadius={5} bg={'gray.100'} p={6} w={'100%'} maxW={450}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading color={'gray'} textAlign={'center'}>
          Register
        </Heading>
        <InputForm label='User' isErrorForm={!!errors.user?.username} errorsResponse={errorsResponse['username']}>
          <Input type='text' bg={'white'} {...register('user.username', { required: true })} />
        </InputForm>
        <InputForm label='Email' isErrorForm={!!errors.user?.email} errorsResponse={errorsResponse['email']}>
          <Input type='email' bg={'white'} {...register('user.email', { required: true, pattern: /^\S+@\S+$/i })} />
        </InputForm>
        <InputForm label='Password' isErrorForm={!!errors.user?.password} errorsResponse={errorsResponse['password']}>
          <Input type='password' bg={'white'} {...register('user.password', { required: true })} />
        </InputForm>
        <Button isLoading={newUser.isLoading} loadingText={'Registering'} w={'100%'} mb={2} type='submit'>
          Register
        </Button>
        <div>
          <Text display={'inline-block'} pr={1}>
            Already Registered?
          </Text>
          <Link href={routes.LOGIN}>
            <a style={{ fontWeight: '600' }}>Login</a>
          </Link>
        </div>
      </form>
    </Box>
  );
}

export default Register;
