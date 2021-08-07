import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587002050292_3796';

  // add your egg config in here
  config.middleware = [];
  config.sequelize = {
    host: '127.0.0.1',
    port: 3306,
    database: 'windhunter',
    dialect: 'mysql',
    password: 'Liefeng123',
    // 时区设置
    dialectOptions: {
      useUTC: false, // for reading from database
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
    timezone: '+8:00', // for writing to database
    define: {
      freezeTableName: true,
    },
  };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'Liefeng123',
      // 数据库名
      database: 'windhunter',
    },
  };
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: 'Liefeng123',
      db: 0,
    },
  };
  config.jwt = {
    secret: 'windhunter', // 自定义 token 的加密条件字符串
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ 'https://windhunter.cn', 'http://windhunter.cn' ], // 允许访问接口的白名单
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.multipart = {
    mode: 'file',
  };
  // 渲染模板
  config.view = {
    mapping: {
      '.html': 'nunjucks',
    },
  };

  // add your special config in here
  const bizConfig = {
    pwdSecret: 'windhunter',
    uploadDir: {
      avatar: 'app/public/avatar/',
      project: 'app/public/project/',
      task: 'app/public/task/',
    },
    prefix: 'http://windhunter.cn:7001/',
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
