import { Application } from 'egg';

module.exports = (app: Application) => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Comment = app.model.define('comment', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    authorId: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'author_id',
      references: {
        model: 'user',
        key: 'id',
      },
    },
    content: { type: TEXT, allowNull: false },
    associateType: { type: STRING(16), allowNull: false, defaultValue: 'article', field: 'associate_type' },
    associateId: { type: INTEGER, allowNull: false, defaultValue: 0, field: 'associate_id' },
    status: { type: STRING(16), allowNull: false, defaultValue: 'normal' },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });

  (Comment as any).associate = function(): void {
    app.model.Comment.belongsTo(app.model.User, { foreignKey: 'authorId', targetKey: 'id' });
  };

  return Comment;
};

