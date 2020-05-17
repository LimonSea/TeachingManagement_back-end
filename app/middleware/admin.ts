import { Code } from '../util/util';

module.exports = () => {
  return async function checkAdmin(ctx, next) {
    const { currentAuthority } = ctx.state.user;
    if (currentAuthority !== 'admin') {
      ctx.body = { ...Code.ERROR, msg: '暂无权限' };
    } else {
      await next();
    }
  };
};
