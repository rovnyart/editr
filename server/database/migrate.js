/* eslint-disable no-console */
import { spawnSync } from 'child_process';

import argumentsParser from 'minimist';

import db from '.';


const argv = argumentsParser(process.argv.slice(2));
const method = argv._[0] || 'up';
console.log(method);
const params = {};
if (typeof argv.from !== 'undefined') params.from = argv.from;
if (typeof argv.to !== 'undefined') params.to = argv.to;

console.log(`Migrating "${process.env.NODE_ENV}" environment...`);

db.umzug.hardReset = () => new Promise((resolve, reject) => {
  const { database, username } = db.sequelize.options;
  setImmediate(() => {
    try {
      console.log(`dropdb --username ${username} ${database}`);
      spawnSync('dropdb', ['--username', username, database], { stdio: 'inherit' });
      console.log(`createdb --username ${username} ${database}`);
      spawnSync('createdb', ['--username', username, database], { stdio: 'inherit' });
      resolve();
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
});

db.umzug[method](params)
  .then((migrations) => {
    if (migrations && migrations.length === 0) console.log('Migrations not found');
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
