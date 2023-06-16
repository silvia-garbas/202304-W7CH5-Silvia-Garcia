import { Router as createRouter } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { UserRepo } from '../repository/user.mongo.repository.js';
import { Repo } from '../repository/repo.js';
import { User } from '../entities/user.js';

import createDebug from 'debug';
const debug = createDebug('W6:UserRouter');

debug('Executed');

const repo: Repo<User> = new UserRepo() as Repo<User>;
const controller = new UserController(repo);
export const userRouter = createRouter();

userRouter.get('/', controller.getAll.bind(controller));
userRouter.post('/register', controller.register.bind(controller));
userRouter.patch('/login', controller.login.bind(controller));
