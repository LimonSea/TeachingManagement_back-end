import { Service } from 'egg';
import { Code } from '../util/util';

export default class Article extends Service {
  // 发布文章
  async create() {
    const { ctx } = this;
    const { title, desc, content } = ctx.request.body;
    const { id } = ctx.state.user;
    const result = await ctx.model.Article.create({ title, desc, content, authorId: id });
    if (result.toJSON()) return { ...Code.SUCCESS, id: result.id };
    return { ...Code.ERROR };
  }

  // 查看文章列表
  async search() {
    const { ctx } = this;
    // const { keyword = null, type = null } = ctx.query; TODO:增加关键词和类型搜索
    const { authorId, currentPage = 1, count = 10 } = ctx.query;
    const searchAttribute = {
      authorId,
    };
    // 筛选，去除空的属性
    Object.keys(searchAttribute).forEach(key => {
      if (!searchAttribute[key]) delete searchAttribute[key];
    });
    const result = await ctx.model.Article.findAndCountAll({
      include: {
        attributes: [ 'name', 'avatar', 'groupId' ],
        model: ctx.model.User,
        include: {
          attributes: [ 'name' ],
          model: ctx.model.Group,
        },
      },
      where: searchAttribute,
      order: [[ 'createdAt', 'DESC' ]],
      limit: parseInt(count),
      offset: (currentPage - 1) * count,
    });
    return { ...Code.SUCCESS, data: result.rows, totalCount: result.count };
  }

  // 查看文章
  async show() {
    const { ctx } = this;
    const { id } = ctx.query;
    const result = await ctx.model.Article.findOne({
      include: {
        attributes: [ 'name', 'avatar', 'groupId' ],
        model: ctx.model.User,
        include: {
          attributes: [ 'name' ],
          model: ctx.model.Group,
        },
      },
      where: {
        id,
      },
    });
    const commentList = await ctx.model.Comment.findAndCountAll({
      include: {
        attributes: [ 'name', 'avatar' ],
        model: ctx.model.User,
      },
      where: {
        associateId: id,
        associateType: 'article',
      },
    });
    return { ...Code.SUCCESS, ...result.toJSON(), commentsCount: commentList.count, comments: commentList.rows };
  }
}

