import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  id: string;
  @IsNotEmpty() // the name is required
  name: string;
  author: string;
}

export class UpdateTaskDto {
  id: string;
  name: string;
  content: string;
  author: string;
}
