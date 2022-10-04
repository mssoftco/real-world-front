import React from 'react';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import styles from '@/components/inputs/InputForm/index.module.css';

type InputFormType = {
  label: string;
  isErrorForm: boolean;
  errorsResponse: string[] | undefined;
  children: React.ReactElement;
};
function InputForm({ label, isErrorForm, errorsResponse, children }: InputFormType) {
  const isErrorResponse = !!errorsResponse;
  const errorMessage = isErrorResponse ? errorsResponse?.join('\n') : `${label} is required.`;
  return (
    <>
      <FormControl className={styles.formControl} isInvalid={isErrorForm || isErrorResponse}>
        <FormLabel>{label}</FormLabel>
        {children}
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    </>
  );
}

export default InputForm;
