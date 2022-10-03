import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { routes } from '@/constants/defaults';
import Link from 'next/link';
import styles from '@/components/layouts/Sidebar/index.module.css';

const sidebarData = [
  {
    title: 'Post',
    navList: [
      {
        label: 'All Articles',
        href: routes.ARTICLES
      },
      {
        label: 'New Article',
        href: routes.CREATE_ARTICLE
      }
    ]
  }
];

function Sidebar() {
  return (
    <Box h={'100%'} bg='blue.500'>
      {sidebarData.map(({ title, navList }) => {
        return (
          <div key={title} className={styles.listWrapper}>
            <Text className={styles.title}>{title}</Text>
            <ul className={styles.list}>
              {navList.map(({ label, href }) => (
                <li key={label} className={styles.listItem}>
                  <Link href={href}>
                    <a>{label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </Box>
  );
}

export default Sidebar;
