import { Service } from 'egg';
import { Code } from '../util/util';

export default class Resource extends Service {
  // 创建资源
  async create() {
    const { ctx } = this;
    const { groupId } = ctx.state.user;
    const { cover, title, desc, href, type } = ctx.request.body;
    const data = await ctx.model.Resource.create({ groupId, cover, title, desc, href, type });
    if (data) return { ...Code.SUCCESS, data };
    return { ...Code.ERROR };
  }

  // 更新资源
  async update() {
    const { ctx } = this;
    const { id, cover, title, desc, href, type } = ctx.request.body;
    const result = await ctx.model.Resource.update({ cover, title, desc, href, type }, { where: { id } });
    if (result) return { ...Code.SUCCESS };
    return { ...Code.ERROR };
  }

  // 查看资源列表
  async search() {
    const { ctx } = this;
    const { groupId } = ctx.state.user;
    const result = await ctx.model.Resource.findAll({ where: { groupId } });
    const data = {};
    result.forEach(item => {
      if (!data[item.type]) data[item.type] = [];
      data[item.type].push(item);
    });
    return { ...Code.SUCCESS, data };
  }


  // 删除项目
  async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const deleteProject = await ctx.model.Resource.destroy({ where: { id } });
    if (deleteProject) return { ...Code.SUCCESS };
    return { ...Code.ERROR };
  }
}
