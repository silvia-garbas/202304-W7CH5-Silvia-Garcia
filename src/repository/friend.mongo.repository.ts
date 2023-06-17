import { FriendModel } from './friend.mongo.model.js';
import createDebug from 'debug';
import { Friend } from '../entities/friend.js';
import { Repo } from './repo.js';
import { HttpError } from '../types/http.error.js';
const debug = createDebug('W7:FriendRepo');

export class FriendRepo implements Repo<Friend> {
  constructor() {
    debug('Instantiated');
  }

  async query(): Promise<Friend[]> {
    const aData = await FriendModel.find().populate('friendUser', { friends: 0 }).exec();
    return aData;
  }

  async queryById(id: string): Promise<Friend> {
    const result = await FriendModel.findById(id)
      .populate('friendUser', { friends: 0 })
      .exec();
    if (result === null)
      throw new HttpError(404, 'Not found', 'Bad id for the query');
    return result;
  }

  async search({
    key,
    value,
  }: {
    key: string;
    value: unknown;
  }): Promise<Friend[]> {
    const result = await FriendModel.find({ [key]: value })
      .populate('friendUser', { friends: 0 })
      .exec();
    return result;
  }

  async create(data: Omit<Friend, 'id'>): Promise<Friend> {
    const newBook = await FriendModel.create(data);
    return newBook;
  }

  async update(id: string, data: Partial<Friend>): Promise<Friend> {
    const newFriend = await FriendModel.findByIdAndUpdate(id, data, {
      new: true,
    })
      .populate('friendUser', { friends: 0 })
      .exec();
    if (newFriend === null)
      throw new HttpError(404, 'Not found', 'Bad id for the update');
    return newFriend;
  }

  async delete(id: string): Promise<void> {
    const result = await FriendModel.findByIdAndDelete(id).exec();
    if (result === null)
      throw new HttpError(404, 'Not found', 'Bad id for the delete');
  }
}
