import { useQuery } from '@tanstack/react-query';
import Tags from '@/services/tage';
import { Tags as TagsType } from '@/types/tags';

export function useGetTags() {
  return useQuery<TagsType>(['tags'], () => Tags.get());
}
