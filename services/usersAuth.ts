import { UserForLogin, UserForRegister } from '@/types/user';
import request from '@/services/config/axios.config';

export default class User {
  static register(user: UserForRegister) {
    return request({
      url: '/users',
      method: 'POST',
      data: user
    });
  }
  static login(user: UserForLogin) {
    return request({
      url: '/users/login',
      method: 'POST',
      data: user
    });
  }
  static get() {
    return request({
      url: '/user',
      method: 'GET'
    });
  }
}
