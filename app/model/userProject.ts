import { Application } from 'egg';

module.exports = (app: Application) => {
  const { INTEGER, DATE } = app.Sequelize;

  const UserProject = app.model.define('userproject', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: INTEGER, allowNull: true, unique: 'userproject', field: 'user_id' },
    projectId: { type: INTEGER, allowNull: true, unique: 'userproject', field: 'project_id' },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });

  return UserProject;
};

