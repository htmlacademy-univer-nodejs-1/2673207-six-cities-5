import { StatusCodes } from 'http-status-codes';
import { BaseUserException } from './base-user.exception.js';

export class AuthException extends BaseUserException {
  constructor(message: string, detail?: string) {
    super(StatusCodes.UNAUTHORIZED, message, detail);
  }
}
