
 export type User = {// Está mal.
  id: string;
  userName: string;
  email: string;
  passwd: string;
  friends: User[];
  enemies: User[]

};

export type UserLogin = {
  user: String; // UserName/email
  passwd: string;
};
// P  export type Avatar = {
//   urlOriginal: string;
//   url: string;
//   mimetype: string;
//   size: number;
// };
