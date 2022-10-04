import { getDataFromStorage, setDataToStorage } from '@/utils/dataStorage';

// success handler
import { REDIRECT_STORAGE_KEY, routes, TOKEN_STORAGE_KEY } from '@/constants/defaults';

export const onSuccess = (response: any) => {
  return response.data;
};

// error handler
export const onError = async (error: any) => {
  if (!error?.response) {
    throw new Error(`${error.response?.status} - error - please check internet and try again :(`);
  }
  switch (error.response?.status) {
    case 401:
    case 403:
      const token = getDataFromStorage(TOKEN_STORAGE_KEY, true);
      if (window?.location?.pathname !== routes.LOGIN && !token) {
        setDataToStorage(REDIRECT_STORAGE_KEY, window?.location?.pathname, false, 'session');
        window?.location?.replace(routes.LOGIN);
      } else {
        return Promise.reject(error.response?.data?.errors ? error.response?.data?.errors : error.response?.data);
      }
      break;
    case 502:
      throw new Error(`${error.response?.status} - ${error.response?.data.errors}`);
    default:
      return Promise.reject(error.response?.data?.errors);
  }
};
