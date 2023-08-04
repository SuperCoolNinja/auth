export interface IUser {
  id: number;
  pseudo: string;
  email: string;
  password: string;
  created_at: Date;
  is_admin : boolean;
}