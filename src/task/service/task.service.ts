import { TaskRepository } from './../repositories/task.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async all(query: any) {
    return this.taskRepository.getByCondition(query);
  }
  async detail(id: string) {
    const task = await this.taskRepository.findById(id);
    if (task) {
      return task;
    } else {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
  async create(data: any) {
    return await this.taskRepository.create(data);
  }
  async put(id: string, data: any) {
    return await this.taskRepository.findByIdAndUpdate(id, data);
  }
  async delete(id: string) {
    return await this.taskRepository.deleteOne(id);
  }
}
