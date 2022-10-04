import request from '@/services/config/axios.config';
import { ArticleForEditor } from '@/types/article';

export default class Articles {
  static get(queryString?: string) {
    return request({
      url: `/articles${queryString ? queryString : ''}`,
      method: 'GET'
    });
  }
  static create(article: ArticleForEditor) {
    return request({
      url: '/articles',
      method: 'POST',
      data: article
    });
  }
  static delete(slug: string) {
    return request({
      url: `/articles/${slug}`,
      method: 'DELETE'
    });
  }
}
