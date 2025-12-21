import { Logger } from "pino";
import { BaseController } from "../../../rest/index.js";
import { Component } from "../../types/component.enum.js";
import { inject, injectable } from "inversify";
import { UserService } from "./user-service.interface.js";
import { HttpMethod } from "../../types/http-method.enum.js";
import { Response, Request } from "express";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { Config, RestSchema } from "../../libs/config/index.js";

@injectable()
export class UserContoller extends BaseController
{
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) protected readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController...');
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create })
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login })
    this.addRoute({ path: '/logout', method: HttpMethod.Post, handler: this.logout })
    this.addRoute({ path: '/status', method: HttpMethod.Get, handler: this.status })
  }

  public async create(req: Request, res: Response): Promise<void> {
    const userDto = this.convertToCreateUserDto(req)
    const createdUser = await this.userService.create(userDto, this.config.get('SALT'));
    this.created(res, createdUser);
  }

  public async login(_req: Request, _res: Response): Promise<void> {
    //TODO
  }

  public async logout(_req: Request, _res: Response): Promise<void> {
    //TODO
  }

  public async status(_req: Request, _res: Response): Promise<void> {
    //TODO
  }

  private convertToCreateUserDto(req: Request): CreateUserDto {
    const userDTO: CreateUserDto = {
      name: req.body.name || 'name',
      email: req.body.email || 'email@eamil.com',
      password: req.body.password || 'password',
      avatar: req.body.avatar || 'avatar',
      type: req.body.type || 'Standart'
    }
    return userDTO;
  }
}
