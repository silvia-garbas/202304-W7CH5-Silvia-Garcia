// Import { Film } from './film';

export type User = {
  id: string;
  userName: string;
  email: string;
  passwd: string;
  friends: User[];
  enemies: User[]
  // Films: Film[];
};

export type UserLogin = {
  user: String; // UserName/email
  passwd: string;
};
