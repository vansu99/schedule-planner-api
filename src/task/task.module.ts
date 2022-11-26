import { Module } from '@nestjs/common';
import { TaskSchema } from './model/task.model';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './service/task.service';
import { TaskController } from './controller/task.controller';
import { TaskRepository } from './repositories/task.repository';

const modelList = [
  {
    name: 'Task',
    schema: TaskSchema,
  },
];

@Module({
  imports: [MongooseModule.forFeature(modelList)],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}
