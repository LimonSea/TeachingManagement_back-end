import { Application } from 'egg';

module.exports = (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Project = app.model.define('project', {
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
    cover: { type: STRING(256), allowNull: false, defaultValue: 'normal' },
    title: { type: STRING(100), allowNull: false, defaultValue: 'normal' },
    desc: { type: STRING(150), allowNull: false, defaultValue: 'normal' },
    github: { type: STRING(150), allowNull: false, defaultValue: 'normal' },
    status: { type: STRING(16), allowNull: false, defaultValue: 'normal' },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });

  (Project as any).associate = function(): void {
    app.model.Project.belongsToMany(app.model.User, {
      through: {
        model: 'userproject',
        unique: false,
      },
      foreignKey: 'projectId',
      constraints: false,
    });
    app.model.Project.belongsTo(app.model.Group, { foreignKey: 'groupId' });
  };

  return Project;
};

