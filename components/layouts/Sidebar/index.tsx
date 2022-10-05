import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { sidebarData } from '@/constants/defaults';
import Link from 'next/link';
import styles from '@/components/layouts/Sidebar/index.module.css';
import { useRouter } from 'next/router';

/* TODO - add skeleton*/

function Sidebar() {
  const router = useRouter();
  const { pathname: routerPath } = router;

  return (
    <Box h={'100%'} bg='blue.500' display={'grid'}>
      {sidebarData.map(({ title, navList }) => {
        return (
          <div key={title} className={styles.listWrapper}>
            <Text className={styles.title}>{title}</Text>
            <ul className={styles.list}>
              {navList.map(({ label, href }) => (
                <li key={label} className={`${styles.listItem} ${href === routerPath && styles.listItemActive}`}>
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
