import { Controller } from 'egg';
export default class Project extends Controller {
  // // 发表文章
  // async createArticle() {
  //   const ctx = this.ctx;
  //   ctx.status = 201;
  //   ctx.body = await ctx.service.article.create();
  // }

  // 搜索项目组列表
  async search() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.project.search();
  }

  // // 显示文章
  // async showArticle() {
  //   const ctx = this.ctx;
  //   ctx.status = 200;
  //   ctx.body = await ctx.service.article.show();
  // }

  // // 发表评论
  // async createComment() {
  //   const ctx = this.ctx;
  //   ctx.status = 201;
  //   ctx.body = await ctx.service.comment.create();
  // }

}
