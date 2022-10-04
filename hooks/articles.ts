import { useMutation, useQuery } from '@tanstack/react-query';
import Articles from '@/services/articles';
import { ArticleForEditor, ArticlesType } from '@/types/article';

export function useCreateArticle() {
  return useMutation((article: ArticleForEditor) => Articles.create(article));
}

export function useGetArticles(query?: string) {
  return useQuery<ArticlesType>(['articles', query], () => Articles.get(query));
}

export function useDeleteArticle() {
  return useMutation((slug: string) => Articles.delete(slug));
}
