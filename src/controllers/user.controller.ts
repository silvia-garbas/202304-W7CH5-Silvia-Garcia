import { NextFunction, Request, Response } from 'express';
import { UserRepo } from '../repository/user.mongo.repository.js';

import createDebug from 'debug';
const debug = createDebug('W6:FilmController');
import { AuthServices, PayloadToken } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';
import { LoginResponse } from '../types/response.api.js';
import { Controller } from './controller.js';
import { User } from '../entities/user.js';

export class UserController extends Controller<User> {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: UserRepo) {
    super();
    debug('Instantiated');
  }

  async register(req: Request, res: Response, next: NextFunction) {
    // Viene de post
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
    // Viene de post
    try {
      if (!req.body.user || !req.body.passwd) {
        // Analizamos lo que no sha llegado
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

      const isUserValid = await AuthServices.compare(
        req.body.passwd,
        data[0].passwd
      );

      if (!isUserValid) {
        throw new HttpError(400, 'Bad request', 'User or password invalid');
      }

      const payload: PayloadToken = {
        id: data[0].id,
        userName: data[0].userName,
      };
      const token = AuthServices.createJWT(payload); // Devuelve string que corresponde al token ya formado
      // eslint-disable-next-line no-multi-assign
      const response: LoginResponse = {
        token,
        user: data[0],
      };

      res.send(response);
    } catch (error) {
      next(error);
    }
  }
}
