import { AuthGuard } from '@nestjs/passport'
import { Controller, Get, Req, UseGuards } from '@nestjs/common'

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard())
  @Get('profile')
  async getProfile(@Req() req: any) {
    console.log('ac')
    return req.user
  }
}
