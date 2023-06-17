import { EnemyModel } from './enemy.mongo.model.js';
import createDebug from 'debug';
import { Enemy } from '../entities/enemy.js';
import { Repo } from './repo.js';
import { HttpError } from '../types/http.error.js';
const debug = createDebug('W7:FriendRepo');

export class EnemyRepo implements Repo<Enemy> {
  constructor() {
    debug('Instantiated');
  }

  async query(): Promise<Enemy[]> {
    const aData = await EnemyModel.find()
      .populate('enemyUser', { enemies: 0 })
      .exec();
    return aData;
  }

  async queryById(id: string): Promise<Enemy> {
    const result = await EnemyModel.findById(id)
      .populate('enemyUser', { enemies: 0 })
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
  }): Promise<Enemy[]> {
    const result = await EnemyModel.find({ [key]: value })
      .populate('enemyUser', { enemies: 0 })
      .exec();
    return result;
  }

  async create(data: Omit<Enemy, 'id'>): Promise<Enemy> {
    const newEnemy = await EnemyModel.create(data);
    return newEnemy;
  }

  async update(id: string, data: Partial<Enemy>): Promise<Enemy> {
    const newEnemy = await EnemyModel.findByIdAndUpdate(id, data, {
      new: true,
    })
      .populate('enemyUser', { enemies: 0 })
      .exec();
    if (newEnemy === null)
      throw new HttpError(404, 'Not found', 'Bad id for the update');
    return newEnemy;
  }

  async delete(id: string): Promise<void> {
    const result = await EnemyModel.findByIdAndDelete(id).exec();
    if (result === null)
      throw new HttpError(404, 'Not found', 'Bad id for the delete');
  }
}
