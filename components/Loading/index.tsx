import React from 'react';
import { Spinner } from '@chakra-ui/react';

function Loading({ ...rest }) {
  return <Spinner thickness={'4px'} size={'xl'} {...rest} />;
}

export default Loading;
