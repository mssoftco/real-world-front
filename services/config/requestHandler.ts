import * as dataStorage from '@/utils/dataStorage';

// success handler
import { REDIRECT_STORAGE_KEY, routes, TOKEN_STORAGE_KEY } from '@/constants/defaults';
import { getDataFromStorage } from '@/utils/dataStorage';

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
      const token = dataStorage.getDataFromStorage(TOKEN_STORAGE_KEY);
      if (window?.location?.pathname !== routes.LOGIN && !token) {
        dataStorage.saveDataToStorage(REDIRECT_STORAGE_KEY, window?.location?.pathname, 'session');
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
