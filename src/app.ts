import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';

import { userRouter } from './routers/user.router.js';

import { errorHandler } from './middleware/error.js';

const debug = createDebug('W7:App');

export const app = express();

debug('Loaded Express App');

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

// App.use((_req, _res, next) => {
//   debug('Soy un middleware');
//   next();
// TEMP next(new Error('Error'));
// } );

// MARTES app.use(express.static('public')); mirar esto que lo he quitado martes20&

app.get('/', (req, res) => {
  res.send('Social network...');
});



app.use('/user', userRouter);
app.use(errorHandler);
