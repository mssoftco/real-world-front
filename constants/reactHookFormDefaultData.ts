import { UserForLogin, UserForRegister } from '@/types/user';
import { ArticleForEditor } from '@/types/article';

export const userForRegisterDefaultValues: UserForRegister = {
  user: {
    username: '',
    password: '',
    email: ''
  }
};

export const userForLoginDefaultValues: UserForLogin = {
  user: {
    email: '',
    password: ''
  }
};

export const articleForEditorDefaultValues: ArticleForEditor = {
  article: {
    title: '',
    description: '',
    body: '',
    tagList: []
  }
};
