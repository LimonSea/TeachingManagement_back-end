import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, jwt } = app;

  // 用户
  // router.get('/', controller.home.index);
  router.get('/user/list', controller.user.list);
  router.post('/user/register', controller.user.create);
  router.get('/user/login/captcha', controller.user.getCaptcha);
  router.post('/user/login/account', controller.user.login);
  router.post('/user/admin', jwt, controller.user.admin); // 验证token
  router.get('/user/currentUser', jwt, controller.user.currentUser);
  router.get('/user/userCenterInfo', controller.user.userCenterInfo);
  router.post('/user/update', jwt, controller.user.update);

  // 文章
  router.post('/writing/submitArticle', jwt, controller.writing.createArticle);
  router.get('/writing/searchArticle', controller.writing.searchArticle);
  router.get('/writing/showArticle', controller.writing.showArticle);

  // 评论
  router.post('/writing/submitComment', jwt, controller.writing.createComment);

  // 项目组
  router.get('/project/search', jwt, controller.project.search);
  router.post('/project/create', jwt, controller.project.create);
  router.post('/project/update', jwt, controller.project.update);

  // 工作室
  router.get('/group/member', jwt, controller.group.getMember);

  // 上传图片
  router.post('/upload', controller.tools.upload);


};
