export enum Role {
  Admin = 'admin',
  User = 'user'
}

export type UserType = {
  id: number;
  name: string;
  email: string;
  role: Role
};
