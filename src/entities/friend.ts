import { User } from './user';

export type Friend = {
  id: string;
  userName: string;
  friendUser: User;
};
