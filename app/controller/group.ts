import { Controller } from 'egg';
export default class Group extends Controller {
  // 获取工作室全部成员
  async getMember() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.group.getMember();
  }

  // 添加成员
  async addMember() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.group.addMember();
  }
}
