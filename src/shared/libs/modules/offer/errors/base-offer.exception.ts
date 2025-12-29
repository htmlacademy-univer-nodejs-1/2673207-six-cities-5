import { HttpError } from '../../../rest/index.js';

export class BaseOfferException extends HttpError {
  constructor(httpStatusCode: number, message: string, detail?: string) {
    super(httpStatusCode, message, detail);
  }
}
