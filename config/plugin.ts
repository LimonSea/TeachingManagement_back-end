import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize-ts',
  },
};

export default plugin;
