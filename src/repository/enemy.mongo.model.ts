
import { Schema, model } from 'mongoose';
import { Enemy } from '../entities/enemy';

const enemySchema = new Schema<Enemy>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },

  enemyUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

enemySchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.passwd;
  },
});

export const EnemydModel = model('Enemy', enemySchema, 'enemies');
