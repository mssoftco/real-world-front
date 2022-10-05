import React from 'react';
import { Spinner } from '@chakra-ui/react';

function Loading({ ...rest }) {
  return (
    <div style={{ width: '100%', paddingTop: '20px', textAlign: 'center' }}>
      <Spinner thickness={'3px'} size={'xl'} {...rest} />
    </div>
  );
}

export default Loading;
