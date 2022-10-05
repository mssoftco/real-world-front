export const BASE_URL = 'https://api.realworld.io/api';
export const TOKEN_STORAGE_KEY = 'token';
export const REDIRECT_STORAGE_KEY = 'redirectUri';

export const headTableData = ['#', 'Title', 'Author', 'Tags', 'Excerpt', 'Created', 'Actions'];

export const routes = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ARTICLES: '/articles',
  CREATE_ARTICLE: '/articles/create',
  EDIT_ARTICLE: '/articles/edit'
};

export const sidebarData = [
  {
    title: 'Post',
    navList: [
      {
        label: 'All Articles',
        href: routes.ARTICLES
      },
      {
        label: 'New Article',
        href: routes.CREATE_ARTICLE
      }
    ]
  }
];
