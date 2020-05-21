import { Application } from 'egg';

module.exports = (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Group = app.model.define('group', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(30), allowNull: false, defaultValue: 'normal' },
    cover: { type: STRING(256), allowNull: false, defaultValue: 'normal' },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });

  (Group as any).associate = function(): void {
    app.model.Group.hasMany(app.model.User, { foreignKey: 'groupId' });
    app.model.Group.hasMany(app.model.Project, { foreignKey: 'groupId' });
    app.model.Group.hasMany(app.model.Task, { foreignKey: 'groupId' });
  };

  return Group;
};
