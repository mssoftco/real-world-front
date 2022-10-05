import request from '@/services/config/axios.config';

export default class Tags {
  static get() {
    return request({
      url: '/tags',
      method: 'GET'
    });
  }
}
