export default {
  up: ({ sequelize }) => sequelize.transaction((transaction) => sequelize.query(`
    CREATE TABLE users (
      id SERIAL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
      deleted_at TIMESTAMP WITH TIME ZONE,
      PRIMARY KEY (id)
    );

    CREATE UNIQUE INDEX "users_email" ON users (email);

    CREATE TABLE "sessions" (
      "sid" VARCHAR(32) ,
      "expires" TIMESTAMP WITH TIME ZONE,
      "data" TEXT,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
      "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL,
      PRIMARY KEY ("sid")
      );
  `, { transaction })),
  down: ({ sequelize }) => sequelize.transaction((transaction) => sequelize.query(`
    DROP TABLE users;
    DROP TABLE sessions;
`, { transaction })),
};
