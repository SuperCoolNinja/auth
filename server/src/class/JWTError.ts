import { JWTErrorType } from "../enums/EJWTErrorType";

export class JWTError extends Error {
  constructor(public readonly type: JWTErrorType) {
    super(type);
    this.name = 'JWTError';
  }
}

export class TokenNotFoundError extends JWTError {
  constructor(public readonly type: JWTErrorType) {
    super(type);
    this.name = 'TokenNotFoundError';
  }
}

export class InvalidTokenError extends JWTError {
  constructor(public readonly type: JWTErrorType) {
    super(type);
    this.name = 'InvalidTokenError';
  }
}

export class TokenExpiredError extends JWTError {
  expiredAt: Date;

  constructor(public readonly type: JWTErrorType) {
    super(type);
    this.name = 'TokenExpiredError';
    this.expiredAt = new Date(); // Initialize expiredAt to the current date
  }
}