export default {
  up: ({ sequelize }) => sequelize.query(`
    ALTER TABLE notes ADD COLUMN language VARCHAR(255) DEFAULT 'javascript';
  `),
  down: ({ sequelize }) => sequelize.query(`
    ALTER TABLE notes DROP COLUMN language;
  `),
};
