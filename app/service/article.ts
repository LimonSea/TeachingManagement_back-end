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
    let result: any;
    const { ctx, app } = this;
    const { Sequelize: Seq } = app;
    // const { id = ctx.state.user, keyword = null, type = null } = ctx.query; TODO:增加关键词和类型搜索
    const { authorId, currentPage = 1, count = 10 } = ctx.query;
    if (authorId) {
      result = await ctx.model.Article.findAndCountAll({
        attributes: {
          include: [
            [ Seq.col('user.name'), 'owner' ],
            [ Seq.col('user.avatar'), 'avatar' ],
            [ Seq.col('user.group_id'), 'groupId' ],
            [ Seq.col('user->group.name'), 'groupName' ],
          ],
        },
        include: {
          attributes: [],
          model: ctx.model.User,
          include: {
            attributes: [],
            model: ctx.model.Group,
          },
        },
        where: {
          authorId,
        },
        limit: parseInt(count),
        offset: (currentPage - 1) * count,
      });
    }
    return { ...Code.SUCCESS, data: result.rows, totalCount: result.count };
  }
}

