import { User } from '../../../types/index.js';

export class UserEntity implements User {
  public email: string;
  public avatar: string;
  public name: string;
  public password: string;
  public type: 'обычный' | 'pro'
}
