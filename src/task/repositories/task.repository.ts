import { Model } from 'mongoose';
import { Task } from '../model/task.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/repository/base.repository';

@Injectable()
export class TaskRepository extends BaseRepository<Task> {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {
    super(taskModel);
  }
}
