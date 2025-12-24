import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpError, HttpMethod } from '../../../libs/rest/index.js';
import { Logger } from '../../../libs/logger/index.js';
import { Component } from '../../../types/index.js';
import { CreateUserRequest } from './create-user-request.type.js';
import { UserService } from './user-service.interface.js';
import { Config, RestSchema } from '../../config/index.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../../helpers/index.js';
import { UserRdo } from './rdo/user.rdo.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.UserService) protected readonly userService: UserService,
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController…');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.register });
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login });
    this.addRoute({ path: '/logout', method: HttpMethod.Post, handler: this.logout });
    this.addRoute({ path: '/check', method: HttpMethod.Get, handler: this.check });
  }

  public async login(_req: Request, _res: Response): Promise<void> {
    throw new Error('[UserController] Oops');
  }

  public async logout(_req: Request, _res: Response): Promise<void> {
    throw new Error('[UserController] Oops');
  }

  public async check(_req: Request, _res: Response): Promise<void> {
    throw new Error('[UserController] Oops');
  }

  public async register({ body }: CreateUserRequest, res: Response): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }
}
