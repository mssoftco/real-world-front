import { useMutation } from '@tanstack/react-query';
import { UserForLogin, UserForRegister } from '@/types/user';
import User from '@/services/usersAuth';

export function useCreateUser() {
  return useMutation((user: UserForRegister) => User.register(user));
}

export function useLoginUser() {
  return useMutation((user: UserForLogin) => User.login(user));
}
