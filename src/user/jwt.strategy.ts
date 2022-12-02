import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from '@user/service/auth.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY,
    })
  }

  async validate({ email }) {
    const user = await this.authService.validateUser(email)

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }

    return user
  }
}
