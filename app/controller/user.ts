import { Controller } from 'egg';
export default class User extends Controller {
  async list() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.user.list();
  }
  async create() {
    const ctx = this.ctx;
    ctx.status = 201;
    ctx.body = await ctx.service.user.create();
  }
  async getCaptcha() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.user.getCaptcha();
  }
  async login() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.user.login();
  }

  async admin() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.user.admin();
  }

  async currentUser() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.user.currentUser();
  }

  async userCenterInfo() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.user.userCenterInfo();
  }
}
