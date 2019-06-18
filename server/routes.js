/* eslint-disable global-require */
import path from 'path';

import config from './config/environment';

const dontCacheAPI = (req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store');
  next();
};

export default function (app) {
  app.all('/api/*', dontCacheAPI);

  app.use('/api/notes', require('./api/notes').default);

  app.get('*', (req, res) => {
    if (process.env.NODE_ENV !== 'development') {
      res.sendFile(path.join(process.cwd(), 'app/index.html'));
    } else if (!config.disableFrontend) {
      // Since webpackDevMiddleware uses memory-fs internally to store build artifacts, we use it instead
      app.get('fileSystem').readFile(path.join(app.get('appPath'), 'index.html'), (err, file) => {
        if (err) res.sendStatus(404);
        else res.send(file.toString());
      });
    }
  });
}
