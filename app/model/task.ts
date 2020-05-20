import { Application } from 'egg';

module.exports = (app: Application) => {
  const { STRING, INTEGER, DATE, TEXT, NOW } = app.Sequelize;

  const Task = app.model.define('task', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    groupId: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 0,
      field: 'group_id',
      references: {
        model: 'group',
        key: 'id',
      },
    },
    title: { type: STRING(100), allowNull: false, defaultValue: 'normal' },
    content: TEXT,
    deadline: { type: DATE, allowNull: false, defaultValue: NOW },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });

  (Task as any).associate = function(): void {
    app.model.Task.belongsToMany(app.model.User, {
      through: {
        model: 'usertask',
        unique: false,
      },
      foreignKey: 'taskId',
      constraints: false,
    });
    app.model.Task.belongsTo(app.model.Group, { foreignKey: 'groupId' });
  };

  return Task;
};

