import { Router as createRouter } from 'express';
import { FriendController } from '../controllers/friend.controller.js';
import { FriendRepo } from '../repository/friend.mongo.repository.js';
import { Repo } from '../repository/repo.js';
import { Friend } from '../entities/friend.js';

import createDebug from 'debug';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { UserRepo } from '../repository/user.mongo.repository.js';
const debug = createDebug('W7:FriendRouter');

debug('Executed');

const repo: Repo<Friend> = new FriendRepo();
const userRepo = new UserRepo();
const controller = new FriendController(repo, userRepo);
const auth = new AuthInterceptor(repo);
export const friendRouter = createRouter();

friendRouter.get('/', controller.getAll.bind(controller));
friendRouter.get('/:id', controller.getById.bind(controller));
friendRouter.post('/', auth.logged.bind(auth), controller.post.bind(controller));
friendRouter.patch(
  '/:id',
  auth.logged.bind(auth),
  auth.authorizedForFriends.bind(auth),
  controller.patch.bind(controller)
);
friendRouter.delete(
  '/:id',
  auth.logged.bind(auth),
  auth.authorizedForFriends.bind(auth),
  controller.deleteById.bind(controller)
);
