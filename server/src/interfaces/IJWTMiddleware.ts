export interface ITokenPayload {
  pseudo: string;
  is_admin : boolean;
  iat: number;
  exp: number;
}

export interface IJWTMiddleware {
  headers: {
    authorization?: string;
  };
  token?: ITokenPayload; // Assuming ITokenPayload is the type for the decoded token
}