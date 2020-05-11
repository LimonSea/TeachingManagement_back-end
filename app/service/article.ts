import { Service } from 'egg';
import { Code } from '../util/util';

export default class Article extends Service {
  // 发布文章
  async create() {
    const { ctx } = this;
    const { title, desc, content } = ctx.request.body;
    const { id } = ctx.state.user;
    const result = await ctx.model.Article.create({ title, desc, content, authorId: id });
    if (result.toJSON()) return { ...Code.SUCCESS };
    return { ...Code.ERROR };
  }

  // 查看文章
  async search() {
    let article: any;
    const { ctx } = this;
    // const { id = ctx.state.user, keyword = null, type = null } = ctx.request.body; TODO:增加关键词和类型搜索
    const { authorId } = ctx.query;
    if (authorId) {
      article = await ctx.model.Article.findAll({
        include: {
          attributes: [ 'name', 'avatar', 'groupId' ],
          model: ctx.model.User,
          include: {
            attributes: [ 'name' ],
            model: ctx.model.Group,
          },
        },
        where: {
          authorId,
        },
      });
    }
    return { ...Code.SUCCESS, ...article };
  }
}

