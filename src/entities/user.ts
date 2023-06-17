// Import { Film } from './film';
import { Friend } from "./friend";
import { Enemy } from "./enemy";

export type User = {
  id: string;
  userName: string;
  email: string;
  passwd: string;
  friends: Friend[];// Mirar
  enemies: Enemy[]// Mirar
  // Films: Film[];
};

export type UserLogin = {
  user: String; // UserName/email
  passwd: string;
};
