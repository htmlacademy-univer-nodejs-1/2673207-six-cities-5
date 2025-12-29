import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { Middleware } from './middleware.interface.js';
import { ValidationError } from '../errors/index.js';

export class ValidateObjectIdMiddleware implements Middleware {
  constructor(private param: string) {}

  public execute({ params }: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.param];

    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new ValidationError(
      `${objectId} is invalid ObjectID`, []
    );
  }
}
