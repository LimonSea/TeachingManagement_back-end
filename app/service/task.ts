import { Service } from 'egg';
import { Code } from '../util/util';

export default class Task extends Service {
  // 创建作业
  async create() {
    const { ctx } = this;
    const { id: publisherId, groupId } = ctx.state.user;
    const { title, content, deadline, users } = ctx.request.body;
    const result = await ctx.model.Task.create({ groupId, publisherId, title, content, deadline });
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
    const tasks = await ctx.model.Task.findAndCountAll({
      where: {
        groupId,
      },
      include: {
        model: ctx.model.User,
        attributes: [ 'id', 'name', 'avatar' ],
      },
      order: [[ 'createdAt', 'DESC' ]],
      limit: parseInt(count),
      offset: (currentPage - 1) * count,
      distinct: true,
    });
    return { ...Code.SUCCESS, data: tasks.rows, totalCount: tasks.count };
  }

  // 查看作业完成人数等详细数据(管理中心)
  async detail() {
    const { ctx } = this;
    const { id } = ctx.query;
    const task = await ctx.model.Task.findByPk(id);
    const users = await task.getUsers({ attributes: [ 'id', 'name', 'avatar' ] });
    return { ...Code.SUCCESS, task, users };
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

  // 学生提交
  async studentSubmit() {
    const { ctx } = this;
    const { id: userId } = ctx.state.user;
    const { id, studentContent } = ctx.request.body;
    const user = await ctx.model.User.findByPk(userId);
    const task = await ctx.model.Task.findByPk(id);
    await user.setTasks(task, { through: { status: 'submitted', studentContent } });
    if (task) return { ...Code.SUCCESS };
    return { ...Code.ERROR };
  }

  // 教师提交
  async teacherSubmit() {
    const { ctx } = this;
    const { id, userId, teacherContent, rate } = ctx.request.body;
    const user = await ctx.model.User.findByPk(userId);
    const task = await ctx.model.Task.findByPk(id);
    await user.setTasks(task, { through: { status: 'revised', teacherContent, rate } });
    if (task) return { ...Code.SUCCESS };
    return { ...Code.ERROR };
  }
}
