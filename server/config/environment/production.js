// Development specific configuration
import argumentsParser from 'minimist';

const argv = argumentsParser(process.argv.slice(2));

export default {
  sequelize: {
    dialect: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'editr_db',
    username: 'developer',
    password: 'developer',
    pool: { max: 5, min: 0, idle: 10000 },
    logging: false,
    define: { underscored: true },
  },
  disableFrontend: argv['disable-frontend'] || process.env.DISABLE_FRONTEND,
  port: 3000,
};
