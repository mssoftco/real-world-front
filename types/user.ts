export type User = {
  user: {
    username: string;
    email: string;
    token: string;
    bio?: string | null;
    image?: string | null;
  };
};

export type UserForRegister = {
  user: {
    username: string;
    email: string;
    password: string;
  };
};

export type UserForLogin = {
  user: {
    email: string;
    password: string;
  };
};

export type UserRegisterResponseErrors = {
  username?: [string];
  email?: [string];
  password?: [string];
};

export type UserLoginResponseErrors = {
  'email or password'?: [string];
  email?: [string];
  password?: [string];
};
