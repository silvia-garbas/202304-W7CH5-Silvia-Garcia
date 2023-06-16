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
});
// Descomento
//  , films: [{
//     tyoe: Schema.Types.ObjectId,
//     ref: 'Film'
//   }]
// });

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    // Delete returnedObject.passwd;
  },
});

export const UserModel = model('User', userSchema, 'users');
