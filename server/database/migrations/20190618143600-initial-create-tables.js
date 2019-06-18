export default {
  up: ({ sequelize }) => sequelize.query(`
    CREATE TABLE notes (
      id         UUID,
      text       VARCHAR(16384) NOT NULL DEFAULT '',
      created_at TIMESTAMP WITH TIME ZONE NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
      PRIMARY KEY(id)
    );
  `),
  down: ({ sequelize }) => sequelize.query(`
      DROP TABLE notes;
  `),
};
