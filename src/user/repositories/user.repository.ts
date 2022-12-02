import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { User } from '@user/model/user.model'
import { InjectModel } from '@nestjs/mongoose'
import { BaseRepository } from 'src/repository/base.repository'

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    super(userModel)
  }
}
