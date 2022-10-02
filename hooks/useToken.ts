import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { tokenAtom } from '@/atoms/user';
import jwt_decode from 'jwt-decode';

export function useToken() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  const [token, setToken] = useAtom(tokenAtom);
  const isLogin = !!token;
  let username = '';
  if (isLogin) {
    username = (jwt_decode(token) as any)?.username || '';
  }
  return { isLoading, isLogin, token, username, setToken };
}
