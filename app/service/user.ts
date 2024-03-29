import { Service } from 'egg';
import { createHmac } from 'crypto';
import { Code, MailContent, MailExpTime } from '../util/util';
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
    const user = await ctx.model.User.findOne({ where: { mail } });
    if (user) return { ...Code.ERROR, msg: '注册失败，用户已存在' };
    // 发送邮件
    const subject = 'WindHunter 验证邮件';
    const text = '验证邮件';
    const html = MailContent.register(mail, `${app.config.prefix}vemail?mail=${mail}`);
    const hasSend = await this.service.tools.sendMail(mail, subject, text, html);
    // 邮件发送成功后，存储用户数据到redis
    if (hasSend) {
      // 生成用户名
      const name = `用户${mobile.substring(mobile.length - 4)}`;
      // 默认头像
      const avatar = 'public/avatar/normal.png';
      // 密码 Hmac 加密存储
      password = createHmac('md5', app.config.pwdSecret).update(password).digest('hex');
      app.redis.set(
        `registerMail${mail}`,
        JSON.stringify({ name, mail, password, mobile, avatar }),
        'EX',
        MailExpTime,
      );
      return { ...Code.SUCCESS };
    }
    return { ...Code.ERROR };
  }

  // 验证邮件
  async vemail() {
    const { ctx, app } = this;
    const { mail } = ctx.query;
    const user = await app.redis.get(`registerMail${mail}`);
    if (!user) return { ...Code.ERROR, msg: '验证链接已失效' };
    // 存储数据库
    const { name, password, mobile, avatar } = JSON.parse(user);
    const result = await ctx.model.User.create({ name, mail, password, mobile, avatar });
    if (result.toJSON()) {
      await app.redis.del(`registerMail${mail}`); // 在缓存中删除
      return { ...Code.SUCCESS, msg: '邮箱验证成功！开启你的学习之路吧！' };
    }
    return { ...Code.ERROR, msg: '验证链接失败，请重试' };
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
    if (!result) return { ...Code.ERROR, msg: '用户名或密码错误！' };
    // 生成token
    const token = app.jwt.sign({
      id: result.id, // 需要存储的 token 数据
      currentAuthority: result.currentAuthority,
      groupId: result.groupId,
    }, app.config.jwt.secret, {
      expiresIn: 60 * 24 * 60, // 过期时间，当前为24小时
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

  // 获取当前用户，使用token
  async currentUser() {
    const { ctx, app } = this;
    const result = await ctx.model.User.findOne({
      attributes: {
        include: [
          [ app.Sequelize.col('group.name'), 'groupName' ],
        ],
        exclude: [ 'password' ],
      },
      include: {
        attributes: [],
        model: ctx.model.Group,
      },
      where: {
        id: ctx.state.user.id,
      },
    });
    if (result) return { ...Code.SUCCESS, ...result.toJSON() };
    return { ...Code.ERROR };
  }

  // 获取主页的用户数据
  async userCenterInfo() {
    const { ctx, app } = this;
    const { id } = ctx.query;
    const result = await ctx.model.User.findOne({
      attributes: {
        include: [
          [ app.Sequelize.col('group.name'), 'groupName' ],
        ],
        exclude: [ 'password' ],
      },
      include: {
        attributes: [],
        model: ctx.model.Group,
      },
      where: { id },
    });
    if (result) return { ...Code.SUCCESS, ...result.toJSON() };
    return { ...Code.ERROR };
  }

  // 更新
  async update() {
    const { ctx } = this;
    const { sex, age, mail, mobile, name, signature, avatar, id } = ctx.request.body;
    // 存储数据库
    const result = await ctx.model.User.update({ sex, age, name, mail, mobile, avatar, signature }, {
      where: { id },
    });
    if (result) return { ...Code.SUCCESS };
    return { ...Code.ERROR };
  }

  // 查看用户的所有项目
  async getProjectList() {
    const { ctx } = this;
    const { groupId: myGoupId } = ctx.state.user;
    const { userId, groupId: currentGroupId } = ctx.query;
    if (!myGoupId === currentGroupId) return { ...Code.ERROR, msg: '无权查看非工作室用户的项目' };
    const result = await ctx.model.User.findOne({
      attributes: [],
      include: {
        model: ctx.model.Project,
        include: {
          model: ctx.model.User,
          attributes: [ 'id', 'name', 'avatar' ],
        },
      },
      where: {
        id: userId,
      },
    });
    if (result) return { ...Code.SUCCESS, data: result.projects, totalCount: result.projects.length };
    return { ...Code.ERROR };
  }

  // 查看用户的所有作业
  async getTaskList() {
    const { ctx } = this;
    const { id } = ctx.state.user;
    const { currentPage = 1, count = 10 } = ctx.query;
    const user = await ctx.model.User.findByPk(id);
    const tasks = await user.getTasks({
      order: [[ 'createdAt', 'DESC' ]],
      limit: parseInt(count),
      offset: (currentPage - 1) * count,
    });
    if (tasks) return { ...Code.SUCCESS, data: tasks, totalCount: tasks.length };
    return { ...Code.ERROR };
  }

  // 查看用户的作业详情
  async getTaskDetail() {
    const { ctx } = this;
    const { userId, id } = ctx.query;
    const user = await ctx.model.User.findByPk(userId, { attributes: [ 'id', 'name', 'avatar' ] });
    const task = await user.getTasks({ where: { id } });
    const publisher = await ctx.model.User.findByPk(task[0].publisherId, { attributes: [ 'id', 'name', 'avatar' ] });
    return { ...Code.SUCCESS, data: task[0], user, publisher };
  }
}
