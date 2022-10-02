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

type UserForState = {
  user: {
    username: string;
    token: string;
  };
};

export type { User, UserForLogin, UserForRegister, UserForState };
