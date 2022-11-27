import * as bcrypt from 'bcrypt'
import { LoginUserDto, CreateUserDto } from '../dto/user.dto'
import { UserRepository } from '../repositories/user.repository'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * create Create the user
   * @author EvanC
   */
  async create(userDto: CreateUserDto) {
    userDto.password = await bcrypt.hash(userDto.password, 10)

    // check the user is exist
    const userInfo = await this.userRepository.findByCondition({
      email: userDto.email,
    })
    if (userInfo) {
      throw new HttpException('The user already exists', HttpStatus.BAD_REQUEST)
    }

    return await this.userRepository.create(userDto)
  }

  /**
   * detail Get the user detail
   * @author EvanC
   */
  async detail({ email, password }: LoginUserDto) {
    const userInfo = await this.userRepository.findByCondition({ email })
    if (!userInfo) {
      throw new HttpException('The user is not found', HttpStatus.UNAUTHORIZED)
    }

    const is_equal_pwd = bcrypt.compareSync(password, userInfo.password)
    if (!is_equal_pwd) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
    }

    return userInfo
  }
}
