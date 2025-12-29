import { Expose } from 'class-transformer';

export class CheckUserRdo {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public name: string;

  @Expose()
  public avatar: string;

  @Expose()
  public type: 'обычный' | 'pro';
}
