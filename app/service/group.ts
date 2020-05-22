import { Service } from 'egg';
import { Code } from '../util/util';
export default class Group extends Service {
  // 获取全部用户
  async getMember() {
    const { ctx } = this;
    const { groupId } = ctx.state.user;
    const result: any = await ctx.model.Group.findOne({
      include: {
        attributes: [ 'id', 'name', 'avatar' ],
        model: ctx.model.User,
      },
      where: {
        id: groupId,
      },
    });
    return { ...Code.SUCCESS, ...result.toJSON() };
  }

  // 添加成员
  async addMember() {
    const { ctx } = this;
    const { groupId } = ctx.state.user;
    const { id } = ctx.request.body;
    const user = await ctx.model.User.findByPk(id);
    if (!user) return { ...Code.ERROR, msg: '未找到此用户' };
    if (user.groupId !== 0) {
      return { ...Code.ERROR,
        msg: user.groupId === groupId ? '该用户已加入您的工作室，不可重复加入' : '该用户已加入其他工作室',
      };
    }
    await ctx.model.User.update({ groupId }, { where: { id } });
    return { ...Code.SUCCESS, result: user };
  }

}
