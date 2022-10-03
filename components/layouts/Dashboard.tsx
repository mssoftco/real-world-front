import React from 'react';
import Header from '@/components/layouts/Header';
import { Grid, GridItem } from '@chakra-ui/react';
import Sidebar from '@/components/layouts/Sidebar';
import styles from '@/components/layouts/Dashboard.module.css';

type Props = {
  children: React.ReactElement;
};

const Dashboard = ({ children }: Props) => {
  return (
    <Grid className={styles.dashboardLayout}>
      <GridItem className={styles.header}>
        <Header />
      </GridItem>
      <GridItem className={styles.sidebar}>
        <Sidebar />
      </GridItem>
      <GridItem className={styles.content} bg='white'>
        {children}
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
