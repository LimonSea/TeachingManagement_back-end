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

  // 查看作业详情
  async detail() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.task.detail();
  }

  // 删除作业
  async delete() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.task.delete();
  }

  // 学生提交
  async studentSubmit() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.task.studentSubmit();
  }

  // 教师提交
  async teacherSubmit() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = await ctx.service.task.teacherSubmit();
  }
}
