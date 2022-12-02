import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { JwtStrategy } from '@user/jwt.strategy'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import { EXPIRESIN, SECRETKEY } from '@/constants'
import { UserSchema } from '@user/model/user.model'
import { AuthService } from '@user/service/auth.service'
import { UserService } from '@user/service/user.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthController } from '@user/controller/auth.controller'
import { UserController } from '@user/controller/user.controller'
import { UserRepository } from '@user/repositories/user.repository'

const modelList = [
  {
    name: 'User',
    schema: UserSchema,
  },
]

@Module({
  imports: [
    MongooseModule.forFeature(modelList),
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRETKEY'),
        signOptions: {
          expiresIn: configService.get('EXPIRESIN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [UserService, AuthService, UserRepository, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
