import { NextFunction, Request, Response } from 'express';
import { EnemyRepo } from '../repository/enemy.mongo.repository.js';
import { Controller } from './controller.js';
import { Enemy } from '../entities/enemy.js';
import createDebug from 'debug';
import { PayloadToken } from '../services/auth.js';
import { UserRepo } from '../repository/user.mongo.repository.js';
const debug = createDebug('W7:EnemyController');

export class EnemyController extends Controller<Enemy> {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: EnemyRepo, private userRepo: UserRepo) {
    super();
    debug('Instantiated');
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.body.tokenPayload as PayloadToken;
      const user = await this.userRepo.queryById(userId);
      delete req.body.tokenPayload;
      req.body.enemyUser = userId;
      const newEnemy = await this.repo.create(req.body);
      user.enemies.push(newEnemy);
      this.userRepo.update(user.id, user);
      res.status(201);
      res.send(newEnemy);
    } catch (error) {
      next(error);
    }
  }
}
