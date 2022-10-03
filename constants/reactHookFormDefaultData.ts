import { UserForLogin, UserForRegister } from '@/types/user';

export const userForRegisterDefaultValues: UserForRegister = {
  user: {
    username: '',
    password: '',
    email: ''
  }
};

export const userForLoginDefaultValues: UserForLogin = {
  user: {
    email: '',
    password: ''
  }
};
