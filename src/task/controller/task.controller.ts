import { CreateTaskDto, UpdateTaskDto } from './../dto/task.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from '../service/task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTask(@Query() query: any) {
    return this.taskService.all(query);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.detail(id);
  }

  @Post()
  async createTask(@Body() task: CreateTaskDto) {
    return this.taskService.create(task);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() task: UpdateTaskDto) {
    return this.taskService.put(id, task);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    await this.taskService.delete(id);
    return true;
  }
}
