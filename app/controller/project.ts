import { Controller } from 'egg';
export default class Project extends Controller {
  // // 创建项目
  async create() {
    const { ctx } = this;
    ctx.status = 201;
    ctx.body = await ctx.service.project.create();
  }

  // // 更新项目
  async update() {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = await ctx.service.project.update();
  }

  // 搜索项目组列表
  async search() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.project.search();
  }

  // 删除项目
  async delete() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.project.delete();
  }
}
