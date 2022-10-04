import { useMutation, useQuery } from '@tanstack/react-query';
import Articles from '@/services/articles';
import { UserForLogin } from '@/types/user';
import User from '@/services/usersAuth';

export function useArticles(query?: string) {
  return useQuery(['articles'], () => Articles.get(query));
}

export function useDeleteArticle() {
  return useMutation((slug: string) => Articles.delete(slug));
}
