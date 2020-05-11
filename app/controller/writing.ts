import { Controller } from 'egg';
export default class Article extends Controller {
  // 发表文章
  async createArticle() {
    const ctx = this.ctx;
    ctx.status = 201;
    ctx.body = await ctx.service.article.create();
  }

  // 查看文章
  async searchArticle() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.article.search();
  }
}
