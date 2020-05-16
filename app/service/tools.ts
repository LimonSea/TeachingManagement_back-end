import { Service } from 'egg';
import fs = require('fs');
import path = require('path');
import mkdirp = require('mkdirp');
import { Code } from '../util/util';

export default class Tools extends Service {
  // 上传单个文件
  async upload() {
    const { ctx, config } = this;
    const { type } = ctx.request.body;
    const file = ctx.request.files[0];
    // 取到文件
    const currentFile = fs.readFileSync(file.filepath);
    // 文件存储路径（如果没有则创建）
    await mkdirp(config.uploadDir[type]);
    // 生成文件名
    const name = config.uploadDir[type] + Date.now() + path.basename(file.filename);
    try {
      // 存储文件
      await fs.writeFileSync(name, currentFile);
    } finally {
      // 删除临时文件， unlink这个函数必须传入第二个参数
      await fs.unlink(file.filepath, () => null);
    }
    return { ...Code.SUCCESS, name: name.substring(4) };
  }
}

