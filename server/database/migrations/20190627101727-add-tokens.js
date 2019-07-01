
export default {
  up: ({ sequelize }) => sequelize.transaction((transaction) => sequelize.query(`
    CREATE TYPE enum_token_actions AS ENUM('registration', 'reset-password');
    CREATE TABLE tokens (
      id UUID,
      action public.enum_token_actions NOT NULL DEFAULT 'registration',
      payload JSONB,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL,
      PRIMARY KEY (id)
    );
    ALTER TABLE users ADD COLUMN is_email_confirmed BOOLEAN DEFAULT FALSE;
`, { transaction })),
  down: ({ sequelize }) => sequelize.transaction((transaction) => sequelize.query(`
    DROP TABLE tokens;
    DROP TYPE enum_token_actions;
    ALTER TABLE users DROP COLUMN is_email_confirmed;
  `, { transaction })),
};
