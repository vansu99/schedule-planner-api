import { JwtService } from '@nestjs/jwt'
import { User } from '@user/model/user.model'
import { UserService } from '@user/service/user.service'
import { CreateUserDto, LoginUserDto } from '@user/dto/user.dto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async register(userDto: CreateUserDto) {
    const user = await this.userService.create(userDto)
    const token = await this._createToken(user)
    return {
      email: user.email,
      ...token,
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByLogin(loginUserDto)
    const token = await this._createToken(user)

    return {
      email: user.email,
      ...token,
    }
  }

  /**
   * @name validateUser checking the email of the user
   * @author SuTV
   */
  async validateUser(email: string) {
    const user = await this.userService.findByEmail(email)
    console.log({ user })
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
    return user
  }

  private async _createToken({ email }, refresh = true) {
    const accessToken = this.jwtService.sign(
      { email },
      {
        secret: process.env.SECRETKEY,
        expiresIn: process.env.EXPIRES_IN,
      }
    )
    if (refresh) {
      const refreshToken = this.jwtService.sign(
        { email },
        {
          secret: process.env.SECRETKEY_REFRESH,
          expiresIn: process.env.EXPIRES_IN_REFRESH,
        }
      )
      await this.userService.update(
        { email: email },
        {
          refreshToken: refreshToken,
        }
      )
      return {
        expiresIn: process.env.EXPIRES_IN,
        accessToken,
        refreshToken,
        expiresInRefresh: process.env.EXPIRES_IN_REFRESH,
      }
    } else {
      return {
        expiresIn: process.env.EXPIRES_IN,
        accessToken,
      }
    }
  }

  async refresh(refresh_token) {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.SECRETKEY_REFRESH,
      })
      const user = await this.userService.getUserByRefresh(refresh_token, payload.email)
      const token = await this._createToken(user, false)
      return {
        email: user.email,
        ...token,
      }
    } catch (e) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
  }

  async logout(user: User) {
    await this.userService.update({ email: user.email }, { refreshToken: null })
  }
}
