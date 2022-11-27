import { Model } from 'mongoose';
import { User } from '../model/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/repository/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {
    super(userModel);
  }
}
