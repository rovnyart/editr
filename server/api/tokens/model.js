/**
 * User sessions
 */
export default (sequelize, dataTypes) => {
  const tokens = sequelize.define('tokens', {
    id: { type: dataTypes.UUID, defaultValue: dataTypes.UUIDV4, primaryKey: true },
    action: { type: dataTypes.ENUM('registration', 'reset-password') },
    payload: { type: dataTypes.JSONB },
  }, { paranoid: false, timestamps: true, updatedAt: false });

  return tokens;
};
