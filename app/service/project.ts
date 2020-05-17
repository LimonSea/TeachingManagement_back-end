import { Service } from 'egg';
import { Code } from '../util/util';

export default class Project extends Service {
  // 创建项目组
  async create() {
    const { ctx } = this;
    const { groupId } = ctx.state.user;
    const { cover, title, desc, status, github, users } = ctx.request.body;
    const result = await ctx.model.Project.create({ groupId, cover, title, desc, status, github });
    const usersInstance = await ctx.model.User.findAll({ where: { id: users } });
    await result.setUsers(usersInstance);
    if (result) return { ...Code.SUCCESS, result };
    return { ...Code.ERROR };
  }

  // 更新项目组
  async update() {
    const { ctx } = this;
    const { id, cover, title, desc, status, github, users } = ctx.request.body;
    const usersInstance = await ctx.model.User.findAll({ where: { id: users } });
    const project = await ctx.model.Project.findByPk(id);
    await project.setUsers(usersInstance);
    await project.update({ id, cover, title, desc, status, github });
    if (project) return { ...Code.SUCCESS };
    return { ...Code.ERROR };
  }

  // 查看项目组列表(管理中心)
  async search() {
    const { ctx } = this;
    const { groupId } = ctx.state.user;
    const { count = 10, currentPage = 1 } = ctx.query;
    const result = await ctx.model.Project.findAndCountAll({
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


  // 删除项目
  async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const project = await ctx.model.Project.findByPk(id);
    await project.setUsers([]);
    const deleteProject = await ctx.model.Project.destroy({ where: { id } });
    if (deleteProject) return { ...Code.SUCCESS };
    return { ...Code.ERROR };
  }
}
