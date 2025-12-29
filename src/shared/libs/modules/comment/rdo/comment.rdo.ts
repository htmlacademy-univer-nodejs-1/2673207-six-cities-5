import { Expose, Transform, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public text: string;

  @Expose()
  public rating: number;

  @Expose()
  public publishDate: Date;

  @Expose({ name: 'userId' })
  @Transform(({ value }) => {
    if (value && typeof value === 'object' && value.id) {
      return value;
    }
    return { id: value };
  })
  @Type(() => UserRdo)
  public user: UserRdo;
}
