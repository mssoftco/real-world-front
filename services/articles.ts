import request from '@/services/config/axios.config';

export default class Article {
  static get() {
    return request({
      url: '/articles',
      method: 'GET'
    });
  }
}
