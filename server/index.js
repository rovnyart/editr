/* eslint-disable no-console */
import https from 'https';
import fs from 'fs';
import path from 'path';

import express from 'express';
import socketIO from 'socket.io';

import serverSetup from './config/express';
import db from './database';
import apiRoutes from './routes';

const { dbConnect, notifyListener } = db;
const app = express();
const options = {
  cert: fs.readFileSync(path.resolve(__dirname, './config/ssl/eddtr.pem')),
  key: fs.readFileSync(path.resolve(__dirname, './config/ssl/eddtr.key')),
};
const server = https.createServer(options, app);
serverSetup(app);
apiRoutes(app);

const io = socketIO(server);
io.set('origins', '*:*');

notifyListener.addChannel('notes_update', (payload) => {
  io.emit('note_changed', payload);
});

process.on('unhandledRejection', (err) => {
  console.log('TERMINATING APP DUE TO UNHANDLED REJECTION\n');
  throw err;
});

server.on('error', (error) => {
  console.log('http server error', error);
  process.exit(1);
});

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    server.close();
    process.exit();
  });
});

const startServer = () => server.listen(app.get('port'), () => {
  console.log(`Server started. URL: http://localhost:${app.get('port')}. Press CTRL-C to stop.`);
});

dbConnect().then(startServer).catch((error) => {
  console.log('Unable to start app: ', error);
  process.exit(1);
});
