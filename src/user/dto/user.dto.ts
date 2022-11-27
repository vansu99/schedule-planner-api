import { IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty() email: string
  @IsNotEmpty() password: string
  @IsNotEmpty() name: string
}

export class LoginUserDto {
  @IsNotEmpty() email: string
  @IsNotEmpty() password: string
}
