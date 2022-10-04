export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
};

export type Author = {
  username: string;
  bio: string | null;
  image: string;
  following: boolean;
};

export type ArticlesType = {
  articles: Article[];
  articlesCount: number;
};

export type ArticleForEditor = {
  article: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  };
};

export type ArticleEditorResponseErrors = {
  title?: [string];
  description?: [string];
  body?: [string];
};
