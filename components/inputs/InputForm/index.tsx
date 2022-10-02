import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

type InputFormType = {
  name: string;
  label: string;
  type: string;
  pattern?: RegExp;
  isErrorForm: boolean;
  errorsResponse: string[] | undefined;
  register: any;
};
function InputForm({ name, label, type, isErrorForm, errorsResponse, register, pattern }: InputFormType) {
  const isErrorResponse = !!errorsResponse;
  const inputProps = { ...register(`user.${name}`, { required: true, pattern }) };
  const errorMessage = isErrorResponse ? errorsResponse?.join('\n') : `${label} is required.`;
  return (
    <>
      <FormControl m={'10px 0 20px'} isInvalid={isErrorForm || isErrorResponse}>
        <FormLabel>{label}</FormLabel>
        <Input bg={'white'} type={type} {...inputProps} />
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    </>
  );
}

export default InputForm;
