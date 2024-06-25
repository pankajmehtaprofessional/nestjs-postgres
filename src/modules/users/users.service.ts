import { Injectable } from '@nestjs/common';
import { User } from './users.enity';
import { BaseOrm } from 'src/BaseOrm';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService extends BaseOrm<User> {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {
    super(userModel);
  }
}
