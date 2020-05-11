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

  // 文章
  router.post('/writing/submitArticle', jwt, controller.writing.createArticle);
  router.get('/writing/searchArticle', controller.writing.searchArticle);
};
