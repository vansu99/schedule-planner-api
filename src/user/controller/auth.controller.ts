import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '../service/auth.service'
import { CreateUserDto, LoginUserDto } from 'src/user/dto/user.dto'
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto)
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto)
  }

  @Post('refresh')
  async refresh(@Body() body) {
    return await this.authService.refresh(body.refresh_token)
  }

  @UseGuards(AuthGuard())
  @Post('logout')
  async logout(@Req() req: any) {
    await this.authService.logout(req.user)
    return {
      statusCode: 200,
    }
  }
}
