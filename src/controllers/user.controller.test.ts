import { NextFunction, Request, Response } from 'express';
import { UserRepo } from '../repository/user.mongo.repository';
import { UserController } from './user.controller';
import { HttpError } from '../types/http.error';
import { AuthServices } from '../services/auth';

jest.mock('../services/auth');
describe('Given UserController class', () => {
  describe('When its instantiated', () => {
    const mockRepo: UserRepo = {
      search: jest.fn(),
      create: jest.fn(),
    } as unknown as UserRepo;

    const req = {
      body: {},
    } as unknown as Request;

    const res = {
      send: jest.fn(),
      status: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;
    const controller = new UserController(mockRepo);

    test('Then method register should be used', async () => {
      req.body = { passwd: 'password' };
      await controller.register(req, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(mockRepo.create).toHaveBeenCalled();
    });

    test('Then method login should be used', async () => {
      req.body = { user: 'testUser', passwd: 'password' };
      await controller.login(req, res, next);
      expect(mockRepo.search).toHaveBeenCalled();
    });
  });

  describe('When there is an error', () => {
    const error = new HttpError(400, 'Bad request', 'User or password invalid');
    const mockRepo: UserRepo = {
      search: jest.fn().mockResolvedValue(error),
      create: jest.fn().mockResolvedValue(error),
    } as unknown as UserRepo;

    const req = {
      body: {},
    } as unknown as Request;

    const res = {
      send: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;
    const controller = new UserController(mockRepo);

    test('login should handle missing user or password error', async () => {
      const error = new HttpError(
        400,
        'Bad request',
        'User or password invalid'
      );
      await controller.login(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });

    test('login should handle invalid user error', async () => {
      req.body = { user: 'invalidUser', passwd: 'password' };
      (mockRepo.search as jest.Mock).mockResolvedValueOnce([]);
      await controller.login(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });

    test('login should handle invalid password error', async () => {
      req.body = { user: 'testUser', passwd: 'invalidPassword' };
      (mockRepo.search as jest.Mock).mockResolvedValueOnce([
        { userName: 'testUser', passwd: 'password' },
      ]);
      await controller.login(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });

    test('login should handle invalid password error', async () => {
      req.body = { user: 'testUser', passwd: 'invalidPassword' };
      (mockRepo.search as jest.Mock).mockResolvedValueOnce([
        { userName: 'testUser', passwd: 'password' },
      ]);
      (AuthServices.compare as jest.Mock).mockResolvedValueOnce(false);
      await controller.login(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When there is an error', () => {
    const error = new Error('An error occurred');
    const mockRepo: UserRepo = {
      create: jest.fn().mockRejectedValue(error),
    } as unknown as UserRepo;

    const req = {
      body: { passwd: 'password' },
    } as unknown as Request;

    const res = {
      send: jest.fn(),
      status: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;
    const controller = new UserController(mockRepo);

    test('register should handle error from create', async () => {
      await controller.register(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });

    test('register should handle error from hash', async () => {
      (AuthServices.hash as jest.Mock).mockRejectedValueOnce(error);
      await controller.register(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
