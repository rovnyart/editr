import path from 'path';

import argumentsParser from 'minimist';

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
console.log(`Running with ${process.env.NODE_ENV} config...`); // eslint-disable-line no-console

const argv = argumentsParser(process.argv.slice(2));

const all = {
  port: argv.port || process.env.PORT || 8888,
  host: argv.host || process.env.HOST || 'localhost',
  logLevel: argv.logLevel || process.env.LOG_LEVEL || 'info',
  database: {
    models: path.resolve('server/api'),
    migrations: path.resolve('server/database/migrations'),
  },
};

// Export the config object based on the NODE_ENV
// ==============================================
export default Object.assign(all, require(`./${process.env.NODE_ENV}.js`).default || {}); // eslint-disable-line global-require
