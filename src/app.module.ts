import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { TaskModule } from './task/task.module'
import { AppController } from './app.controller'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    TaskModule,
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
