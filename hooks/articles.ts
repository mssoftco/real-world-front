import { useQuery } from '@tanstack/react-query';
import Articles from '@/services/articles';

export function useArticles(query?: string) {
  return useQuery(['articles'], () => Articles.get(query));
}
