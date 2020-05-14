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
}

