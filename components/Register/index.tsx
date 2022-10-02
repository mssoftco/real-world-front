import React, { useState } from 'react';
import { Box, Heading, Text, useToast } from '@chakra-ui/react';
import Button from '@/components/inputs/Button';
import { useCreateUser } from '@/hooks/useCreateUser';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserForRegister } from '@/types/user';
import InputForm from '@/components/inputs/InputForm';
import Link from 'next/link';
import styles from './index.module.css';

const defaultValues: UserForRegister = {
  user: {
    username: '',
    password: '',
    email: ''
  }
};

function Register() {
  const [errorsResponse, setErrorsResponse] = useState<{ username?: string[]; password?: string[]; email?: string[] }>({});
  const { register, handleSubmit, reset , formState: { errors } } = useForm<UserForRegister>({ defaultValues }); // prettier-ignore

  const toast = useToast();
  type Status = 'success' | 'error' | 'warning' | 'info' | 'loading';
  const toasty = ([title, description, status]: [string, string, Status]) => {
    toast({ title, description, status, duration: 6000, isClosable: true });
  };

  const newUser = useCreateUser();
  const onSubmit: SubmitHandler<UserForRegister> = data =>
    newUser.mutate(data, {
      onSuccess: () => {
        reset();
        setErrorsResponse({});
        toasty(['Create User', 'User successfully added', 'success']);
      },
      onError: (error: any) => {
        setErrorsResponse(error);
        toasty(['Error Create User', '', 'error']);
      }
    });

  return (
    <Box borderRadius={5} bg={'gray.100'} p={6} w={'100%'} maxW={450}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading color={'gray'} textAlign={'center'}>
          Register
        </Heading>
        <InputForm
          name='username'
          label='User'
          type='text'
          isErrorForm={!!errors.user?.username}
          errorsResponse={errorsResponse['username']}
          {...{ register }}
        />
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
          Register
        </Button>
        <div>
          <Text display={'inline-block'} pr={1}>
            Already Registered?
          </Text>
          <Link href={'/login'}>
            <a className={styles.link}>Login</a>
          </Link>
        </div>
      </form>
    </Box>
  );
}

export default Register;
