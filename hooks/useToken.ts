import { useEffect, useState } from 'react';
import { setDataToStorage, getDataFromStorage } from '@/utils/dataStorage';
import jwt_decode from 'jwt-decode';
import { TOKEN_STORAGE_KEY } from '@/constants/defaults';

export function useToken() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const setTokenWithStorage = (token: string) => {
    setToken(token);
    setDataToStorage(TOKEN_STORAGE_KEY, token, true);
  };

  const removeTokenWithStorage = () => {
    setToken(null);
    setDataToStorage(TOKEN_STORAGE_KEY, '');
  };

  useEffect(() => {
    const token = getDataFromStorage(TOKEN_STORAGE_KEY, true);
    setToken(token);
    setIsLoading(false);
  }, []);

  const isLogin = !!token;
  let username = '';
  if (isLogin) {
    username = (jwt_decode(token) as any)?.username || '';
  }
  return { isLoading, isLogin, token, username, setTokenWithStorage, removeTokenWithStorage };
}
