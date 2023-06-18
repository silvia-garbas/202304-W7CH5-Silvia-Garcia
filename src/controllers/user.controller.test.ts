import { NextFunction, Request, Response } from 'express';
import { UserRepo } from '../repository/user.mongo.repository.js';
import { UserController } from './user.controller.js';
import { HttpError } from '../types/http.error.js';
import { AuthServices } from '../services/auth.js';

jest.mock('../services/auth');
describe('Given a UserController class', () => {
  describe('When its instantiated', () => {
    const mockRepo = {
      search: jest.fn(),
      post: jest.fn(),
    } as unknown as UserRepo;
    const req = {
      body: {},
    } as unknown as Request;
    const res = {
      send: jest.fn(),
      status: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    test('Then the register method should be used', async () => {
      const controller = new UserController(mockRepo);
      req.body = { password: '123' };
      await controller.register(req, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(mockRepo.create).toHaveBeenCalled();
    });

    test('Then method login should be used', async () => {
      const controller = new UserController(mockRepo);
      req.body = { user: 'S', password: '123' };
      (AuthServices.compare as jest.Mock).mockResolvedValueOnce(true);
      await controller.login(req, res, next);
      expect(mockRepo.search).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('When there is an instantiate of error', () => {
    const error = new HttpError(400, 'Bad request', 'Invalid user or password');
    const mockRepo = {
      search: jest.fn().mockResolvedValue(error),
      post: jest.fn().mockResolvedValue(error),
    } as unknown as UserRepo;

    const req = {
      body: {},
    } as unknown as Request;
    const res = {
      send: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    const controller = new UserController(mockRepo);

    test('Then the login method should throw a HttpError if there is not an user or password', async () => {
      const error = new HttpError(
        400,
        'Bad request',
        'Invalid user or password'
      );
      await controller.login(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });

    test('Then the login method should throw a HttpError for an invalid user', async () => {
      req.body = { user: 'Marco', password: 'abcd' };
      (mockRepo.search as jest.Mock).mockResolvedValueOnce([]);
      await controller.login(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });

    test('Then the login method should throw a HttpError for an invalid password', async () => {
      const controller = new UserController(mockRepo);
      req.body = { user: 'S', password: '123' };
      (mockRepo.search as jest.Mock).mockResolvedValueOnce([
        { userName: 'S', password: '123' },
      ]);
      (AuthServices.compare as jest.Mock).mockResolvedValueOnce(false);
      await controller.login(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When there is an instantiate of error', () => {
    const error = new Error('An error occurred');
    const mockRepo = {
      post: jest.fn().mockRejectedValue(error),
    } as unknown as UserRepo;
    const req = {
      body: { password: 'abcd' },
    } as unknown as Request;
    const res = {
      send: jest.fn(),
      status: jest.fn(),
    } as unknown as Response;

    const controller = new UserController(mockRepo);
    const next = jest.fn() as NextFunction;

    test('Then the register method should throw an Error when the post method is not used', async () => {
      await controller.register(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });

    test('Then the register method should throw an Error when the hash method from AuthServices does not work', async () => {
      (AuthServices.hash as jest.Mock).mockRejectedValueOnce(error);
      await controller.register(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
