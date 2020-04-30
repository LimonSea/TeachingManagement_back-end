import { Service } from 'egg';
import { createHash, createHmac } from 'crypto';
import { Code } from '../util/util';
export default class User extends Service {
  // 获取全部用户
  async list() {
    const { ctx } = this;
    const result: any = await ctx.model.User.findAll({});
    return { ...Code.SUCCESS, ...result };
  }
  // 注册
  async create() {
    const { ctx, app } = this;
    const { mail, mobile } = ctx.request.body;
    let { password } = ctx.request.body;
    const md5email = createHash('md5').update(mail).digest('hex'); // 把邮箱转换成md5作为图片的地址
    const avatar = `http://secure.gravatar.com/avatar/${md5email}`; // TODO:头像地址不确定
    // 生成用户名
    const name = `用户${mobile.substring(mobile.length - 4)}`;
    // 密码 Hmac 加密存储
    password = createHmac('md5', app.config.pwdSecret).update(password).digest('hex');
    const result = await ctx.model.User.create({ name, mail, password, mobile, avatar });
    console.log(result.toJSON());
    if (result.toJSON()) {
      return { ...Code.SUCCESS, ...result.toJSON() }; // TODO:之后删掉result.toJSON()
    }
    return { ...Code.ERROR };
  }
  // 获取验证码
  async getCaptcha() {
    // const { ctx } = this;
    // const { mobile } = ctx.params;
    // 发送验证码
    // return Object.assign({}, Code.SUCCESS, {
    //   data: result,
    // });
  }
  // 登录
  async login() {
    const { ctx, app } = this;
    let result;
    const { type, mail, mobile, captcha } = ctx.request.body;
    let { password } = ctx.request.body;
    // Hmac 加密
    password = createHmac('md5', app.config.pwdSecret).update(password).digest('hex');
    if (type === 'account') { // 邮箱账户密码登录
      result = await ctx.model.User.findOne({
        where: {
          mail,
          password,
        },
      });
    } else if (type === 'mobile') { // TODO:手机验证码登录
      console.log(mobile, captcha);
      result = true;
    }
    if (!result) return { ...Code.ERROR };
    // 生成token
    const token = app.jwt.sign({
      id: result.id, // 需要存储的 token 数据
      currentAuthority: result.currentAuthority,
    }, app.config.jwt.secret, {
      expiresIn: 60 * 60, // 过期时间，当前为1小时
    });
    // 保存到redis
    // ctx.redis.set(result.id, token);
    return { ...Code.SUCCESS, token, type, currentAuthority: result.currentAuthority };
  }
  // 测试token的
  async admin() {
    const { ctx } = this;
    console.log(ctx.state.user);
    // const redis_token = await ctx.redis.get(ctx.state.user.id); // 获取redis中的token
    // if (token === redis_token) {
    //   await next();
    // } else {
    //   // 如果不是最新token，则代表用户在另一个机器上进行操作，需要用户重新登录保存最新token
    //   return { ...Code.ERROR, msg: '您的账号已在其他机器保持登录，如果继续将清除其他机器的登录状态' };
    // }
    return { ...Code.SUCCESS, user: ctx.state.user };
  }
  // 获取当前用户
  async currentUser() {
    const { ctx } = this;
    console.log('获取当前用户：', ctx.state.user.id);
    const result = await ctx.model.User.findOne({
      where: {
        id: ctx.state.user.id,
      },
    });
    return { ...Code.SUCCESS, ...result };
  }
}
