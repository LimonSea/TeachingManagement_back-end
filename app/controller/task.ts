import { Controller } from 'egg';
export default class Task extends Controller {
  // // 创建作业
  async create() {
    const { ctx } = this;
    ctx.status = 201;
    ctx.body = await ctx.service.task.create();
  }

  // // 更新作业
  async update() {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = await ctx.service.task.update();
  }

  // 搜索作业列表
  async search() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.task.search();
  }

  // 删除作业
  async delete() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.task.delete();
  }
}
