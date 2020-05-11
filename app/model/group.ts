import { Application } from 'egg';

module.exports = (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Group = app.model.define('groups', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(30), allowNull: false, defaultValue: 'normal' },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });

  (Group as any).associate = function(): void {
    app.model.Group.hasMany(app.model.User, { foreignKey: 'groupId' });
  };

  return Group;
};
