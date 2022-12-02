import * as bcrypt from 'bcrypt'
import { LoginUserDto, CreateUserDto } from '@user/dto/user.dto'
import { UserRepository } from '@user/repositories/user.repository'
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
   * findByLogin Get the user is logged in
   * @author EvanC
   */
  async findByLogin({ email, password }: LoginUserDto) {
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

  /**
   * findByEmail Get the user is logged in by email
   * @author EvanC
   */
  async findByEmail(email: string) {
    const user = await this.userRepository.findByCondition({
      email,
      select: ['-password'],
    })

    return user
  }

  /**
   * update
   * @author EvanC
   */
  async update(filter: any, update: any) {
    if (update.refreshToken) {
      update.refreshToken = await bcrypt.hash(this.reverse(update.refreshToken), 10)
    }
    return await this.userRepository.findByConditionAndUpdate(filter, update)
  }

  /**
   * getUserByRefresh Get the user by refresh token
   * @author EvanC
   */
  async getUserByRefresh(refresh_token: string, email: string) {
    const user = await this.findByEmail(email)
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
    const is_equal = await bcrypt.compare(this.reverse(refresh_token), user.refreshToken)

    if (!is_equal) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
    }

    return user
  }

  private reverse(s: string) {
    return s.split('').reverse().join('')
  }
}
