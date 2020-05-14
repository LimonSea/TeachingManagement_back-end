import { Service } from 'egg';
import { Code } from '../util/util';

export default class Project extends Service {
  // 创建项目组
  // async create() {
  //   const { ctx } = this;
  //   const { title, desc, content } = ctx.request.body;
  //   const { id } = ctx.state.user;
  //   const result = await ctx.model.Article.create({ title, desc, content, authorId: id });
  //   if (result.toJSON()) return { ...Code.SUCCESS };
  //   return { ...Code.ERROR };
  // }

  // 查看项目组列表
  async search() {
    const { ctx } = this;
    // const { ctx, app } = this;
    // const { Sequelize: Seq } = app;
    const { groupId: myGroupId } = ctx.state.user;
    const { groupId: currentGroupId } = ctx.query;
    if (parseInt(myGroupId) === parseInt(currentGroupId)) {
      const result = await ctx.model.Project.findAndCountAll({
        // attributes: {
        //   include: [
        //     [ Seq.col('user.name'), 'owner' ],
        //     [ Seq.col('user.avatar'), 'avatar' ],
        //     [ Seq.col('user.group_id'), 'groupId' ],
        //     [ Seq.col('user->group.name'), 'groupName' ],
        //   ],
        // },
        include: {
          // attributes: [],
          model: ctx.model.User,
        },
        where: {
          groupId: currentGroupId,
        },
      });
      return { ...Code.SUCCESS, data: result.rows, totalCount: result.count };
    }
    return { ...Code.ERROR, msg: '无权限查看' };
  }

  // 查看项目组详情
  // async show() {
  //   const { ctx, app } = this;
  //   const { Sequelize: Seq } = app;
  //   const { id } = ctx.query;
  //   const result = await ctx.model.Article.findOne({
  //     attributes: {
  //       include: [
  //         [ Seq.col('user.name'), 'owner' ],
  //         [ Seq.col('user.avatar'), 'avatar' ],
  //         [ Seq.col('user.group_id'), 'groupId' ],
  //         [ Seq.col('user->group.name'), 'groupName' ],
  //       ],
  //     },
  //     include: {
  //       attributes: [],
  //       model: ctx.model.User,
  //       include: {
  //         attributes: [],
  //         model: ctx.model.Group,
  //       },
  //     },
  //     where: {
  //       id,
  //     },
  //   });
  //   const commentList = await ctx.model.Comment.findAndCountAll({
  //     attributes: {
  //       include: [
  //         [ Seq.col('user.name'), 'owner' ],
  //         [ Seq.col('user.avatar'), 'avatar' ],
  //       ],
  //     },
  //     include: {
  //       attributes: [],
  //       model: ctx.model.User,
  //     },
  //     where: {
  //       associateId: id,
  //       associateType: 'article',
  //     },
  //   });
  //   return { ...Code.SUCCESS, ...result.toJSON(), commentsCount: commentList.count, comments: commentList.rows };
  // }
}
