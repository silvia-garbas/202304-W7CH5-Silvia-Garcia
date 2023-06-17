import { NextFunction, Request, Response } from 'express';
import { FriendRepo } from '../repository/friend.mongo.repository.js';
import { Controller } from './controller.js';
import { Friend } from '../entities/friend.js';

import createDebug from 'debug';
import { PayloadToken } from '../services/auth.js';
import { UserRepo } from '../repository/user.mongo.repository.js';
const debug = createDebug('W7:FriendController');

export class FriendController extends Controller<Friend> {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: FriendRepo, private userRepo: UserRepo) {
    super();
    debug('Instantiated');
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.body.tokenPayload as PayloadToken;
      const user = await this.userRepo.queryById(userId);
      delete req.body.tokenPayload;
      req.body.friendUser = userId;
      const newFriend = await this.repo.create(req.body);
      user.friends.push(newFriend);
      this.userRepo.update(user.id, user);
      res.status(201);
      res.send(newFriend);
    } catch (error) {
      next(error);
    }
  }
}
