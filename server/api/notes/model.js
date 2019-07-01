export default (sequelize, dataTypes) => {
  const Notes = sequelize.define('notes', {
    id: { type: dataTypes.UUID, primaryKey: true, defaultValue: dataTypes.UUIDV4 },
    text: { type: dataTypes.STRING(16384), allowNull: false, defaultValue: '' },
    language: { type: dataTypes.STRING, allowNull: false, defaultValue: 'javascript' },
  }, {
    paranoid: false,
  });

  Notes.associate = ({ users }) => {
    Notes.belongsTo(users);
  };

  return Notes;
};
