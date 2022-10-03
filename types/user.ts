type User = {
  user: { bio?: string | null; email: string; image?: string | null; token: string; username: string };
};

type UserForRegister = {
  user: {
    username: string;
    email: string;
    password: string;
  };
};

type UserForLogin = {
  user: {
    email: string;
    password: string;
  };
};

type UserRegisterResponsiveErrors = {
  username?: [string];
  email?: [string];
  password?: [string];
};

type UserLoginResponsiveErrors = {
  'email or password'?: [string];
  email?: [string];
  password?: [string];
};

export type { User, UserForLogin, UserForRegister, UserRegisterResponsiveErrors, UserLoginResponsiveErrors };
