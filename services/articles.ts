import request from '@/services/config/axios.config';

export default class Articles {
  static get(queryString?: string) {
    return request({
      url: `/articles${queryString ? queryString : ''}`,
      method: 'GET'
    });
  }
}
