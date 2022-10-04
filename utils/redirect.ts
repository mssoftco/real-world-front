import { getDataFromStorage, removeDataFromStorage } from '@/utils/dataStorage';
import { REDIRECT_STORAGE_KEY, routes } from '@/constants/defaults';

export function getRedirectTo() {
  const lastPath = getDataFromStorage(REDIRECT_STORAGE_KEY, false, 'session');
  let redirectPath;
  if (lastPath && lastPath?.length > 0) {
    redirectPath = lastPath;
    removeDataFromStorage(REDIRECT_STORAGE_KEY, 'session');
  } else {
    redirectPath = routes.HOME;
  }
  return redirectPath;
}
