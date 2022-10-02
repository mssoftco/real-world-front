import * as dataStorage from '@/utils/dataStorage';

// success handler
import { REDIRECT_STORAGE_KEY, routes } from '@/constants/defaults';

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
      if (window?.location?.pathname !== routes.LOGIN) {
        dataStorage.saveDataToStorage(REDIRECT_STORAGE_KEY, window?.location?.pathname, 'session');
        window?.location?.replace(routes.LOGIN);
      } else {
        return Promise.reject(error.response?.data?.errors);
      }
      break;
    case 502:
      throw new Error(`${error.response?.status} - ${error.response?.data.errors}`);
    default:
      return Promise.reject(error.response?.data?.errors);
  }
};
