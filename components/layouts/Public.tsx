import React from 'react';
import { Container } from '@chakra-ui/react';

type Props = {
  children: React.ReactElement;
};

const Public = ({ children }: Props) => {
  return (
    <Container height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} maxW={'full'}>
      {children}
    </Container>
  );
};

export default Public;
