import React from 'react';
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

/**
 * Button component
 *
 * @param children
 * @param rest
 */
function Button({ children, ...rest }: ButtonProps) {
  return (
    <ChakraButton loadingText='Loading' colorScheme='blue' variant='solid' size='md' spinnerPlacement='start' {...rest}>
      {children}
    </ChakraButton>
  );
}

export default Button;
