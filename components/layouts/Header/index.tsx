import React from 'react';
import Link from 'next/link';
import { routes } from '@/constants/defaults';

function Header({ username }: any) {
  return (
    <header>
      <h1>Arvan Challenge</h1>
      <p>{`Welcome ${username}`}</p>
      <nav>
        <ul>
          <Link href={routes.LOGIN}>
            <a>login</a>
          </Link>
          <Link href={routes.REGISTER}>
            <a>register</a>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
