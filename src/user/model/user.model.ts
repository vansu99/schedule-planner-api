import { Schema, Document } from 'mongoose';

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    address: String,
    avatar: String,
    phone_number: Number,
    company_name: String,
  },
  { timestamps: true, collection: 'Users' },
);

export { UserSchema };

export interface User extends Document {
  name: string;
  email: string;
  avatar: string;
  address: string;
  password: string;
  phone_number: number;
  company_name: string;
}
