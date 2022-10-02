import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL, TOKEN_STORAGE_KEY } from '@/constants/defaults';
import { onSuccess, onError } from '@/services/config/requestHandler';
import * as dataStorage from '@/utils/dataStorage';

const instance = axios.create({ baseURL: BASE_URL });
instance.defaults.headers.post['Content-Type'] = 'application/json';

const request = async ({ ...options }: AxiosRequestConfig) => {
  const token = JSON?.parse(dataStorage.getDataFromStorage(TOKEN_STORAGE_KEY) || '{}');
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Token ${encodeURIComponent(token)}`;
  }
  return instance(options).then(onSuccess).catch(onError);
};

export default request;
