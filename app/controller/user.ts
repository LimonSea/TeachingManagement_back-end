import { Controller } from 'egg';
export default class User extends Controller {
  public async list() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.user.list();
  }
  public async create() {
    const ctx = this.ctx;
    ctx.status = 201;
    ctx.body = await ctx.service.user.create();
  }
  public async getCaptcha() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.user.getCaptcha();
  }
  public async login() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.user.login();
  }
}
