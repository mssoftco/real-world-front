import React from 'react';

type Props = {
  children: React.ReactElement;
};

const Dashboard = ({ children }: Props) => {
  return (
    <>
      <h1>Dashboard layout</h1>
      {children}
    </>
  );
};

export default Dashboard;
