import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { IJWTMiddleware } from '../interfaces/IJWTMiddleware';
import { JWTErrorType } from '../enums/EJWTErrorType';
import { InvalidTokenError, JWTError, TokenExpiredError, TokenNotFoundError } from '../class/JWTError';


const checkTokenExpiration = (token: string): boolean => {
  try {
    const decodedToken: any = jwt.decode(token, { complete: true });
    if (decodedToken && decodedToken.payload.exp && Date.now() >= decodedToken.payload.exp * 1000) {
      return true;
    }
    return false; 
  } catch (error) {
    throw new TokenExpiredError(JWTErrorType.TokenExpired);
  }
};


export const jwtChecking = (req: IJWTMiddleware, res: Response, next: NextFunction) => {
  const token = (req as any).cookies.token;

  try {
    if (!token) {
      throw new TokenNotFoundError(JWTErrorType.TokenNotFound);
    }

    if (checkTokenExpiration(token)) {
      throw new TokenExpiredError(JWTErrorType.TokenExpired);
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY!, (err: any, decoded: any) => {
      if (err) {
        throw new InvalidTokenError(JWTErrorType.InvalidToken);
      }

      (req as any).user = decoded;

      next();
    });
  } catch (error) {
    if (error instanceof JWTError) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authentication failed.' });
    }
  }
};
