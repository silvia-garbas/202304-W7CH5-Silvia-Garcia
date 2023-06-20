

import { Schema, model } from 'mongoose';
import { User } from '../entities/user.js';
// A import joi from 'joi'

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
  avatar: {
    type: {
      urlOriginal: { type: String },
      url: { type: String },
      mimetype: { type: String },
      size: { type: Number },
    },
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

});

// P export const userShema = joi.object<User>({
//   userName: joi.string().required(),
//   email: joi.string().email().required(), falta message
//   passwd: joi.
//   string().
//   pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required()  Express validation,
// })


userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    // Delete returnedObject.passwd;
  },
});

export const UserModel = model('User', userSchema, 'users');
