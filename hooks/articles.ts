import { useMutation, useQuery } from '@tanstack/react-query';
import Articles from '@/services/articles';
import { Article, ArticleForEditor, ArticlesType } from '@/types/article';

export function useCreateArticle() {
  return useMutation((article: ArticleForEditor) => Articles.create(article));
}
export function useUpdateArticle() {
  return useMutation(({ article, slug }: { article: ArticleForEditor; slug: string }) => Articles.update(article, slug));
}

export function useGetArticleBySlug(slug: string) {
  return useQuery(['article', slug], () => Articles.getBySlug(slug));
}

export function useGetArticles(query?: string) {
  return useQuery<ArticlesType>(['articles', query], () => Articles.get(query));
}

export function useDeleteArticle() {
  return useMutation((slug: string) => Articles.delete(slug));
}
