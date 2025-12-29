import { StatusCodes } from 'http-status-codes';
import { BaseUserException } from './base-user.exception.js';

export class UserAlreadyExistsException extends BaseUserException {
  constructor() {
    super(StatusCodes.CONFLICT, 'User already exists');
  }
}
