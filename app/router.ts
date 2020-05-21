import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, jwt, middleware } = app;
  const checkAdmin = middleware.admin();

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
  router.get('/user/getProjectList', jwt, controller.user.getProjectList);
  router.get('/user/getTaskList', jwt, controller.user.getTaskList);
  router.get('/user/getTaskDetail', jwt, controller.user.getTaskDetail);

  // 文章
  router.post('/writing/submitArticle', jwt, controller.writing.createArticle);
  router.get('/writing/searchArticle', controller.writing.searchArticle);
  router.get('/writing/showArticle', controller.writing.showArticle);

  // 评论
  router.post('/writing/submitComment', jwt, controller.writing.createComment);

  // 项目组
  router.get('/project/search', jwt, checkAdmin, controller.project.search);
  router.post('/project/create', jwt, checkAdmin, controller.project.create);
  router.post('/project/update', jwt, checkAdmin, controller.project.update);
  router.post('/project/delete', jwt, checkAdmin, controller.project.delete);

  // 工作室
  router.get('/group/member', jwt, controller.group.getMember);

  // 上传图片
  router.post('/upload', controller.tools.upload);

  // 作业
  router.get('/task/search', jwt, checkAdmin, controller.task.search);
  router.get('/task/detail', jwt, checkAdmin, controller.task.detail);
  router.post('/task/create', jwt, checkAdmin, controller.task.create);
  router.post('/task/update', jwt, checkAdmin, controller.task.update);
  router.post('/task/delete', jwt, checkAdmin, controller.task.delete);
  router.post('/task/studentSubmit', jwt, controller.task.studentSubmit);
  router.post('/task/teacherSubmit', jwt, checkAdmin, controller.task.teacherSubmit);


};
