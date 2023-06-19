import { NextFunction, Request, Response } from 'express';
import { UserRepo } from '../repository/user.mongo.repository.js';
import { AuthServices, PayloadToken } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';
import { LoginResponse } from '../types/response.api.js';
import createDebug from 'debug';
import { Controller } from './controller.js';
import { User } from '../entities/user.js';
const debug = createDebug('User:UserController');

export class UserController extends Controller<User> {
  // eslint-disable-next-line no-unused-vars
  constructor(public repo: UserRepo) {
    super();
    debug('Instantiated');
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const passwd = await AuthServices.hash(req.body.passwd);
      req.body.passwd = passwd;

      res.status(201);
      res.send(await this.repo.create(req.body));
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.user || !req.body.passwd) {
        throw new HttpError(400, 'Bad request', 'User or password invalid');
      }

      let data = await this.repo.search({
        key: 'userName',
        value: req.body.user,
      });
      if (!data.length) {
        data = await this.repo.search({
          key: 'email',
          value: req.body.user,
        });
      }

      if (!data.length) {
        throw new HttpError(400, 'Bad request', 'User or password invalid');
      }

      const isUserValid = AuthServices.compare(req.body.passwd, data[0].passwd);
      if (!isUserValid) {
        throw new HttpError(400, 'Bad request', 'User or password invalid');
      }

      const payload: PayloadToken = {
        id: data[0].id,
        userName: data[0].userName,
      };
      const token = AuthServices.createJWT(payload);
      const response: LoginResponse = {
        token,
        user: data[0],
      };

      res.send(response);
    } catch (error) {
      next(error);
    }
  }

  async addFriendOrEnemy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.body.tokenPayload as PayloadToken;
      const user = await this.repo.queryById(userId);
      const personToAdd = await this.repo.queryById(req.params.id);
      delete req.body.tokenPayload;

      if (req.path.includes('friend')) user.friends.push(personToAdd);
      if (req.path.includes('enemy')) user.enemies.push(personToAdd);

      await this.repo.update(userId, user);

      res.status(201);
      res.send(user);
    } catch (error) {
      next(error);
    }
  }

  async removeFriendOrEnemy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.body.tokenPayload as PayloadToken;
      const user = await this.repo.queryById(userId);
      const personToRemove = await this.repo.queryById(req.params.id);
      delete req.body.tokenPayload;

      if (req.path.includes('friend')) {
        const userIndex = user.friends.findIndex(
          (item) => item.id === personToRemove.id
        );
        user.friends.splice(userIndex, 1);
      }

      if (req.path.includes('enemy')) {
        const userIndex = user.friends.findIndex(
          (item) => item.id === personToRemove.id
        );
        user.enemies.splice(userIndex, 1);
      }

      await this.repo.update(userId, user);

      res.status(201);
      res.send(user);
      next();
    } catch (error) {
      next(error);
    }
  }
}
