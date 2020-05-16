import { Controller } from 'egg';
export default class Group extends Controller {
  // // 发表文章
  // async createArticle() {
  //   const ctx = this.ctx;
  //   ctx.status = 201;
  //   ctx.body = await ctx.service.article.create();
  // }

  // // 搜索项目组列表
  // async search() {
  //   const ctx = this.ctx;
  //   ctx.status = 200;
  //   ctx.body = await ctx.service.project.search();
  // }

  // 获取工作室全部成员
  async getMember() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.group.getMember();
  }
}
