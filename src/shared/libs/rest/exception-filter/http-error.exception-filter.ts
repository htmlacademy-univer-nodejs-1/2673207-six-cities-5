import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { ExceptionFilter } from './exception-filter.interface.js';
import { Component } from '../../../types/index.js';
import { Logger } from '../../logger/index.js';
import { HttpError } from '../errors/index.js';
import { createErrorObject } from '../../../helpers/index.js';
import { ApplicationError } from '../types/application-error.enum.js';
import { AccessException } from '../../modules/offer/index.js';

@injectable()
export class HttpErrorExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register HttpErrorExceptionFilter');
  }

  public catch(error: unknown, req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(`[HttpErrorException]: ${req.path} # ${error.message}`, error);
    if (error instanceof AccessException) {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({
          errorType: ApplicationError.CommonError,
          error: error.message,
          details: [error.detail],
        });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(createErrorObject(ApplicationError.CommonError, error.message));
    }
  }
}
