import { Application } from 'egg';

module.exports = (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Resource = app.model.define('resource', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: STRING(100), allowNull: false, defaultValue: 'normal' },
    desc: { type: STRING(150), allowNull: false, defaultValue: 'normal' },
    cover: { type: STRING(256), allowNull: false, defaultValue: 'normal' },
    download: { type: STRING(256), allowNull: false, defaultValue: 'normal' },
    href: { type: STRING(256), allowNull: false, defaultValue: 'normal' },
    type: { type: STRING(16), allowNull: false, defaultValue: 'normal' },
    groupId: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'group_id',
      references: {
        model: 'group',
        key: 'id',
      },
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });

  (Resource as any).associate = function(): void {
    app.model.Resource.belongsTo(app.model.Group, { foreignKey: 'groupId' });
  };

  return Resource;
};

