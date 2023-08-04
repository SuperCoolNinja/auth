export interface IUser 
{
  pseudo : string;
  email : string;
  password : string;
  isAdmin  : boolean; 
  createdAt : Date;
}

export interface IUserLogin 
{
  email: string;
  password: string;
}

export interface IUserRegister 
{
  pseudo: string;
  email: string;
  password: string;
}