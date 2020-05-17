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

}
