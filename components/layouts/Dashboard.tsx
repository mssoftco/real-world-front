import React from 'react';
import Header from '@/components/layouts/Header';
import { Grid, GridItem } from '@chakra-ui/react';
import Sidebar from '@/components/layouts/Sidebar';

type Props = {
  children: React.ReactElement;
};

const Dashboard = ({ children }: Props) => {
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"`}
      gridTemplateRows={'60px 1fr'}
      gridTemplateColumns={'300px 1fr'}
      h='100vh'
      gap='0'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem area={'header'}>
        <Header />
      </GridItem>
      <GridItem bg='blue.500' area={'nav'}>
        <Sidebar />
      </GridItem>
      <GridItem bg='white' area={'main'}>
        {children}
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
