import { Application } from 'egg';

module.exports = (app: Application) => {
  const { INTEGER, DATE, TEXT, STRING } = app.Sequelize;

  const UserTask = app.model.define('usertask', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: INTEGER, allowNull: true, unique: 'usertask', field: 'user_id' },
    taskId: { type: INTEGER, allowNull: true, unique: 'usertask', field: 'task_id' },
    status: { type: STRING(16), allowNull: false, defaultValue: 'published' },
    studentContent: { type: TEXT, field: 'student_content' },
    teacherContent: { type: TEXT, field: 'teacher_content' },
    rate: INTEGER,
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });

  return UserTask;
};

