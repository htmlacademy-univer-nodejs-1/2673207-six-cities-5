import { StatusCodes } from 'http-status-codes';
import { BaseOfferException } from './base-offer.exception.js';

export class AccessException extends BaseOfferException {
  constructor(message: string, detail?: string) {
    super(StatusCodes.FORBIDDEN, message, detail);
  }
}
