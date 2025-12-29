import { NextFunction, Request, Response } from 'express';
import { Middleware } from './middleware.interface.js';
import { AuthException } from '../../modules/auth/errors/auth.exception.js';

export class PrivateRouteMiddleware implements Middleware {
  public async execute({ tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    if (! tokenPayload) {
      throw new AuthException(
        'Unauthorized',
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}
