import { Application } from 'egg';

module.exports = (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(30), allowNull: false, defaultValue: 'normal' },
    sex: { type: INTEGER, allowNull: false, defaultValue: 0 },
    age: { type: INTEGER, allowNull: false, defaultValue: 0 },
    mobile: { type: STRING(16), allowNull: false, defaultValue: 'normal' },
    password: { type: STRING(32), allowNull: false, defaultValue: 'normal' },
    avatar: { type: STRING(256), allowNull: false, defaultValue: 'normal' },
    mail: { type: STRING(64), allowNull: false, defaultValue: 'normal' },
    currentAuthority: { type: STRING(16), allowNull: false, defaultValue: 'user', field: 'current_authority' },
    signature: { type: STRING(32), allowNull: true },
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
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  }, {
    getterMethods: {
      avatar() {
        return app.config.prefix + (this as any).getDataValue('avatar');
      },
    },
  });

  (User as any).associate = function(): void {
    app.model.User.belongsTo(app.model.Group, { foreignKey: 'groupId' });
    app.model.User.hasMany(app.model.Article, { foreignKey: 'authorId' });
    app.model.User.hasMany(app.model.Comment, { foreignKey: 'authorId' });
    app.model.User.belongsToMany(app.model.Project, {
      through: {
        model: 'userproject',
        unique: false,
      },
      foreignKey: 'userId',
      constraints: false,
    });
    app.model.User.belongsToMany(app.model.Task, {
      through: {
        model: 'usertask',
        unique: false,
      },
      foreignKey: 'userId',
      constraints: false,
    });
  };

  return User;
};
