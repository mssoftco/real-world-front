import { useMutation } from '@tanstack/react-query';
import { UserForRegister } from '@/types/user';
import User from '@/services/usersAuth';

export function useCreateUser() {
  return useMutation((user: UserForRegister) => User.register(user));
}
