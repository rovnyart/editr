/**
 * User sessions
 */
export default (sequelize, dataTypes) => {
  const session = sequelize.define('session', {
    sid: { type: dataTypes.STRING(36), primaryKey: true },
    expires: dataTypes.DATE,
    data: dataTypes.TEXT,
  }, { paranoid: false });

  return session;
};
