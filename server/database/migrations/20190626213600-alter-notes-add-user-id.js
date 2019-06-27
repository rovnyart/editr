export default {
  up: ({ sequelize }) => sequelize.query(`
    ALTER TABLE notes
      ADD COLUMN user_id INTEGER REFERENCES users (id), ADD COLUMN readonly BOOLEAN DEFAULT FALSE;
  `),
  down: ({ sequelize }) => sequelize.query(`
    ALTER TABLE notes DROP COLUMN user_id, DROP COLUMN readonly;
  `),
};
