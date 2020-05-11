import { Application } from 'egg';

module.exports = (app: Application) => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Article = app.model.define('articles', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: STRING(100), allowNull: false, defaultValue: 'normal' },
    desc: { type: STRING(150), allowNull: false, defaultValue: 'normal' },
    content: { type: TEXT, allowNull: false },
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
    status: { type: STRING(16), allowNull: false, defaultValue: 'public' },
    type: { type: STRING(16), allowNull: false, defaultValue: 'IT' },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });

  (Article as any).associate = function(): void {
    app.model.Article.belongsTo(app.model.User, { foreignKey: 'authorId', targetKey: 'id' });
  };

  return Article;
};

