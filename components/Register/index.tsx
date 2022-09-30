import React from 'react';
import styles from './index.module.css';
import {  Input, FormControl, FormHelperText, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import Button from '../inputs/Button'
function Register() {
  return (
<div>
  <FormControl isInvalid={false}>
    <FormLabel>Email</FormLabel>
    <Input type='email' />
    <FormHelperText>We'll never share your email.</FormHelperText>
    <FormErrorMessage>Email is required.</FormErrorMessage>
  </FormControl>
  <Input/>
  <Button>Register</Button>
</div>
  );
}

export default Register;