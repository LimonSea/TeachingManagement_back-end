import { Controller } from 'egg';
export default class Resource extends Controller {
  // // 创建资源
  async create() {
    const { ctx } = this;
    ctx.status = 201;
    ctx.body = await ctx.service.resource.create();
  }

  // // 更新资源
  async update() {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = await ctx.service.resource.update();
  }

  // 资源列表
  async search() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.resource.search();
  }

  // 删除资源
  async delete() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.resource.delete();
  }
}
