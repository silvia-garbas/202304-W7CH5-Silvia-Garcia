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
      ref: 'User',
    },
  ],
  enemies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  // P avatar: {
  //   type: {
  //     urlOriginal: { type: String },
  //     url: { type: String },
  //     mimetype: { type: String },
  //     size: { type: Number },
  //   },
  //   required: true
  // }
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
