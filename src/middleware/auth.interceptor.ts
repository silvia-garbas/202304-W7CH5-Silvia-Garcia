import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error.js';
import { AuthServices, PayloadToken } from '../services/auth.js';
import createDebug from 'debug';
import { FriendRepo } from '../repository/friend.mongo.repository.js'; // Booleano


const debug = createDebug('W7:AuthInterceptorFriend');
export class AuthInterceptor {
  // eslint-disable-next-line no-unused-vars
  constructor(private friendRepo: FriendRepo) {// FilmRepo/FilmRepo
    debug('Instantiated');
  }

  logged(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.get('Authorization');
      if (!authHeader) {
        throw new HttpError(401, 'Not Authorized', 'Not Authorization header');
      }

      if (!authHeader.startsWith('Bearer')) {
        throw new HttpError(
          401,
          'Not Authorized',
          'Not Bearer in Authorization header'
        );
      }

      const token = authHeader.slice(7);
      const payload = AuthServices.verifyJWTGettingPayload(token);

      req.body.tokenPayload = payload;
      next();
    } catch (error) {
      next(error);
    }
  }

  async authorizedForFriends(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.tokenPayload) {
        throw new HttpError(
          498,
          'Token not found',
          'Token not found in Authorized interceptor'
        );
      }

      const { id: userID } = req.body.tokenPayload as PayloadToken;
      const { id: friendId } = req.params;// Aquí iría friends o enemies
      const friend = await this.friendRepo.queryById(friendId);
      if (friend.friendUser.id!== userID) {
        throw new HttpError(401, 'Not authorized', 'Not authorized');
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
