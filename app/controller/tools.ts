import { Controller } from 'egg';
export default class Tools extends Controller {
  // 上传
  async upload() {
    const ctx = this.ctx;
    ctx.status = 201;
    ctx.body = await ctx.service.tools.upload();
  }
}
