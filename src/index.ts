import http from 'http';
import { app } from './app.js';
// Import * as dotenv from 'dotenv';
import createDebug from 'debug';
const debug = createDebug('W6');
import { dbConnect } from './db/db.connect.js';

// Dotenv.config();
const PORT = process.env.PORT || 4444;

const server = http.createServer(app);

dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    debug('Conected to db:', mongoose.connection.db.databaseName);
  })
  .catch((error) => {
    server.emit('error', error);
  });

server.on('listening', () => {
  debug('Listening on port ' + PORT);
});

server.on('error', (error) => {
  console.log(error.message);
});
