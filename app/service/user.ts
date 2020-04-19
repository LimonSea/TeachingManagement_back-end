import { Service } from 'egg';
// import {HeroInterface} from '../interface/hero.interface';
import { Code } from '../util/util';
export default class User extends Service {
  public async list() {
    const { ctx } = this;
    const result: any = await ctx.model.User.findAll({});
    return Object.assign({}, Code.SUCCESS, {
      data: result,
    });
  }
  public async create() {
    const { ctx } = this;
    const { mail, password, mobile } = ctx.request.body;
    const md5email = 'xxx'; // 把邮箱转换成md5作为图片的地址
    const avatar = `http://secure.gravatar.com/avatar/${md5email}`;
    const result = await ctx.model.User.create({ mail, password, mobile, avatar });
    return Object.assign({}, Code.SUCCESS, {
      data: result,
    });
  }
  public async getCaptcha() {
    // const { ctx } = this;
    // const { mobile } = ctx.params;
    // 发送验证码
    // return Object.assign({}, Code.SUCCESS, {
    //   data: result,
    // });
  }
  public async login() {
    // const { ctx } = this;
    // const { type, userName, password, mobile, captcha } = ctx.request.body;
    // // 账户密码登录
    // if (type === 'account') {

    // }
    // const result = await ctx.model.User.login({ userName, password, mobile, captcha });
    // return Object.assign({}, Code.SUCCESS, {
    //   data: result,
    // });
  }
}
