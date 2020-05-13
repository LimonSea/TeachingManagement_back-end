import { Controller } from 'egg';
export default class Article extends Controller {
  // 发表文章
  async createArticle() {
    const ctx = this.ctx;
    ctx.status = 201;
    ctx.body = await ctx.service.article.create();
  }

  // 搜索文章列表
  async searchArticle() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.article.search();
  }
  // 显示文章
  async showArticle() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.article.show();
  }

  // 发表评论
  async createComment() {
    const ctx = this.ctx;
    ctx.status = 201;
    ctx.body = await ctx.service.comment.create();
  }

}
