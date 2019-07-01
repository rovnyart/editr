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
  mailer: {
    brandName: 'Eddtr (development)',
    from: 'noreply@eddtr.space',
    smtpConfig: {
      host: 'smtp.beget.ru',
      port: 25,
      secure: false,
      logger: true,
      auth: {
        user: 'noreply@eddtr.space',
        pass: 'Bl00dporn1488',
      },
    },
  },
  port: 8888,
};
