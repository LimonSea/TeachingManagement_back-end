import { Service } from 'egg';
import { Code } from '../util/util';

export default class Task extends Service {
  // 创建作业
  async create() {
    const { ctx } = this;
    const { groupId } = ctx.state.user;
    const { title, content, deadline, users } = ctx.request.body;
    const result = await ctx.model.Task.create({ groupId, title, content, deadline });
    const usersInstance = await ctx.model.User.findAll({ where: { id: users } });
    // 创建作业的时候状态都是published，不传也行，数据库默认值就是published
    await result.setUsers(usersInstance, { through: { status: 'published' } });
    if (result) return { ...Code.SUCCESS, result };
    return { ...Code.ERROR };
  }

  // 更新作业
  async update() {
    const { ctx } = this;
    const { id, title, content, deadline, users } = ctx.request.body;
    const usersInstance = await ctx.model.User.findAll({ where: { id: users } });
    const task = await ctx.model.Task.findByPk(id);
    await task.setUsers(usersInstance);
    await task.update({ id, title, content, deadline, users });
    if (task) return { ...Code.SUCCESS };
    return { ...Code.ERROR };
  }

  // 查看作业列表(管理中心)
  async search() {
    const { ctx } = this;
    const { groupId } = ctx.state.user;
    const { count = 10, currentPage = 1 } = ctx.query;
    const result = await ctx.model.Task.findAndCountAll({
      include: {
        attributes: [ 'id', 'name', 'avatar' ],
        model: ctx.model.User,
      },
      where: {
        groupId,
      },
      order: [[ 'createdAt', 'DESC' ]],
      limit: parseInt(count),
      offset: (currentPage - 1) * count,
      distinct: true,
    });
    return { ...Code.SUCCESS, data: result.rows, totalCount: result.count };
  }


  // 删除作业
  async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const task = await ctx.model.Task.findByPk(id);
    await task.setUsers([]);
    const deleteTask = await ctx.model.Task.destroy({ where: { id } });
    if (deleteTask) return { ...Code.SUCCESS };
    return { ...Code.ERROR };
  }
}
