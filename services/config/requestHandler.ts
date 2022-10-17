import { setDataToStorage } from '@/utils/dataStorage';

// success handler
import { REDIRECT_STORAGE_KEY, routes } from '@/constants/defaults';
import Router from "next/router";

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
      setDataToStorage(REDIRECT_STORAGE_KEY, window?.location?.pathname, false, 'session');
      Router.replace(routes.LOGIN).then();
      return Promise.reject(error.response?.data);
    case 403:
      return Promise.reject(error.response?.data?.errors ? error.response?.data?.errors : error.response?.data);
    case 502:
      throw new Error(`${error.response?.status} - ${error.response?.data.errors}`);
    default:
      return Promise.reject(error.response?.data?.errors);
  }
};
