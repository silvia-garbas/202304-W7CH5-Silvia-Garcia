import { Router as createRouter } from 'express';
import { EnemyController } from '../controllers/enemy.controller.js';
import { EnemyRepo } from '../repository/enemy.mongo.repository.js';
import { Repo } from '../repository/repo.js';
import { Enemy } from '../entities/enemy.js';

import createDebug from 'debug';
import { AuthInterceptorEnemy } from '../middleware/auth.interceptor.enemy.js';
import { UserRepo } from '../repository/user.mongo.repository.js';
const debug = createDebug('W7:EnemyRouter');

debug('Executed');

const repo: Repo<Enemy> = new EnemyRepo();
const userRepo = new UserRepo();
const controller = new EnemyController(repo, userRepo);
const auth = new AuthInterceptorEnemy(repo);
export const enemyRouter = createRouter();

enemyRouter.get('/', controller.getAll.bind(controller));
enemyRouter.get('/:id', controller.getById.bind(controller));
enemyRouter.post(
  '/',
  auth.logged.bind(auth),
  controller.post.bind(controller)
);
enemyRouter.patch(
  '/:id',
  auth.logged.bind(auth),
  auth.authorizedForEnemies.bind(auth),
  controller.patch.bind(controller)
);
enemyRouter.delete(
  '/:id',
  auth.logged.bind(auth),
  auth.authorizedForEnemies.bind(auth),
  controller.deleteById.bind(controller)
);
