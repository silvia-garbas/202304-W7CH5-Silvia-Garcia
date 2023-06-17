import { Schema, model } from 'mongoose';
import { Friend } from '../entities/friend';

const friendSchema = new Schema<Friend>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },

  friendUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

friendSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.passwd;
  },
});

export const FriendModel = model('Friend', friendSchema, 'friends');
