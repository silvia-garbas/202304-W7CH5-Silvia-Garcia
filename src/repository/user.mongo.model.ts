import { Schema, model } from 'mongoose';
import { User } from '../entities/user.js';

export const userSchema = new Schema<User>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwd: {
    type: String,
    required: true,
    unique: true,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Friend',
    },
  ],
  enemies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Enemies',
    },
  ],
});

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    // Delete returnedObject.passwd;
  },
});

export const UserModel = model('User', userSchema, 'users');
