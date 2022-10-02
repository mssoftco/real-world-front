import { useMutation } from '@tanstack/react-query';
import { UserForLogin } from '@/types/user';
import User from '@/services/usersAuth';

export function useLoginUser() {
  return useMutation((user: UserForLogin) => User.login(user));
}
