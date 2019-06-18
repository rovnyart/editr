/* eslint-disable no-console */
import path from 'path';

import pg from 'pg';
import Sequelize from 'sequelize';
import Umzug from 'umzug';
import PubSub from 'pg-pubsub';

import scanDirFormModels from '../utils/scanDirForModels';
import config from '../config/environment';

const models = {};
pg.types.setTypeParser(1114, (stringValue) => stringValue); // return TIMESTAMP WITHOUT TIMEZONE as string
const sequelize = new Sequelize(Object.assign(config.sequelize));
const { username, password, host, database } = config.sequelize;
const pubSubConnectionString = `postgresql://${username}:${password}@${host}/${database}`;
const notifyListener = new PubSub(pubSubConnectionString);

sequelize.options.logging = console.log;

scanDirFormModels(path.resolve(__dirname, '../api')).forEach((file) => {
  const imported = [].concat(sequelize.import(file));
  imported.forEach((model) => { models[model.name] = model; });
});

Object.keys(models).forEach((modelName) => {
  const model = models[modelName];
  if ('associate' in model) model.associate(models);
});

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: { sequelize },
  logging: console.log,
  migrations: {
    params: [sequelize.getQueryInterface(), sequelize.constructor],
    path: config.database.migrations,
    traverseDirectories: true,
  },
});

const { NODE_APP_INSTANCE } = process.env;

const dbConnect = async () => {
  await sequelize.authenticate();
  console.log('Connected to database');

  if (!config.database.migrations) return;
  if (NODE_APP_INSTANCE && NODE_APP_INSTANCE !== '0') return;

  const migrations = umzug.up();
  if (migrations.length > 0) {
    console.log(`Upped migrations: ${migrations.map((mig) => `\n${mig.file}`)}`);
  } else {
    console.log('Pending migrations not found');
  }
};

export default {
  Sequelize,
  sequelize,
  models,
  umzug,
  dbConnect,
  notifyListener,
};
