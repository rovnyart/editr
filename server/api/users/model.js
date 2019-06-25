import bcrypt from 'bcrypt';

export default (sequelize, dataTypes) => {
  const Users = sequelize.define('users', {
    email: { type: dataTypes.STRING, unique: true, allowNull: false, validate: { notEmpty: true, isEmail: true } },
    password: { type: dataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
  }, {
    defaultScope: { attributes: { exclude: ['password'] } },
    indexes: [
      { unique: true, fields: ['email'] },
    ],
    hooks: {
      beforeCreate: (user) => user.hashPassword(),
      beforeUpdate: (user) => user.hashPassword(),
    },
    getterMethods: {
      profile() {
        return { id: this.id, createdAt: this.createdAt, updatedAt: this.updatedAt, email: this.email };
      },
    },
  });

  Users.prototype.authenticate = async function authenticate(password) {
    return bcrypt.compareSync(password, this.password);
  };

  Users.prototype.hashPassword = async function hashPassword() {
    if (!this.changed('password')) return;
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt); // eslint-disable-line no-param-reassign
  };

  return Users;
};
