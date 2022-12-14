import { Schema, Document } from 'mongoose';

const TaskSchema = new Schema(
  {
    name: String,
    content: String,
  },
  { timestamps: true, collection: 'Task' },
);

export { TaskSchema };

export interface Task extends Document {
  name: string;
  content: string;
}
