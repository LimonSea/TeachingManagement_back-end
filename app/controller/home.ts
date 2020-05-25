import { Controller } from 'egg';
export default class Home extends Controller {
  async index() {
    await this.ctx.render('index.html'); // 指向的是view文件夹下面的文件
  }
}
