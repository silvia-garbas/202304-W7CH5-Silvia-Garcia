// import { Film } from './film';

export type User = {
  id: string;
  userName: string;
  email: string;
  passwd: string;
  // Films: Film[];
};

export type UserLogin = {
  user: String; // UserName/email
  passwd: string;
};
