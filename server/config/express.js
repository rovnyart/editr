/* eslint-disable global-require */
import path from 'path';

import express from 'express';
import qs from 'qs';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { decode } from 'qs/lib/utils';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import helmet from 'helmet';

import config from './environment';

export default function (app) {
  app.set('port', config.port);
  app.set('json spaces', 4);

  app.set('query parser', (string) => qs.parse(string, {
    decoder: (str) => {
      if (str === 'false') return false;
      if (str === 'true') return true;
      return decode(str);
    },
  }));

  if (process.env.NODE_ENV !== 'development') {
    app.set('trust proxy', true);
    app.set('appPath', path.resolve(process.cwd(), 'app'));
    app.use(express.static(app.get('appPath')));
  } else if (!config.disableFrontend) {
    const webpackConfig = require('../../webpack.dev');
    const compiler = webpack(webpackConfig);
    const middleware = webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true, chunks: false, modules: false, children: false },
      watchOptions: { aggregateTimeout: 100 },
    });
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.set('appPath', compiler.outputPath);
    app.set('fileSystem', middleware.fileSystem);
  }
  app.use(helmet());
  app.use(bodyParser.raw({ type: 'application/soap+xml' }));
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(cookieParser());

  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    if (err.statusCode === 413) return res.status(413).json(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  });

  return app;
}
