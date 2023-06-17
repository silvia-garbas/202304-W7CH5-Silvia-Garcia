import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
// Import { sampleRouter } from './routers/sample.router.js';
import { userRouter } from './routers/user.router.js';
// Import { filmRouter } from './routers/film.router.js';
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

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Social network...');
});

// App.use('/sample', sampleRouter);
// app.use('/film', filmRouter);
app.use('/user', userRouter);
app.use(errorHandler);
