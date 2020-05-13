import { Service } from 'egg';
import { Code } from '../util/util';

export default class Comment extends Service {
  // 发布评论
  async create() {
    const { ctx, app } = this;
    const { Sequelize: Seq } = app;
    const { content, associateId, associateType } = ctx.request.body;
    const { id } = ctx.state.user;
    const result = await ctx.model.Comment.create({ content, associateId, associateType, authorId: id });
    const comment = await ctx.model.Comment.findOne({
      attributes: {
        include: [
          [ Seq.col('user.name'), 'owner' ],
          [ Seq.col('user.avatar'), 'avatar' ],
        ],
      },
      include: {
        attributes: [],
        model: ctx.model.User,
      },
      where: {
        id: result.toJSON().id,
      },
    });
    if (comment) return { ...Code.SUCCESS, comment };
    return { ...Code.ERROR };
  }

  // 查看评论列表
  async search() {
    let result: any;
    const { ctx, app } = this;
    const { Sequelize: Seq } = app;
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

  // 查看评论
  async show() {
    const { ctx, app } = this;
    const { Sequelize: Seq } = app;
    const { id } = ctx.query;
    const result = await ctx.model.Article.findOne({
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
        id,
      },
    });
    return { ...Code.SUCCESS, ...result.toJSON() };
  }
}

