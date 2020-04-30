import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, jwt } = app;

  router.get('/', controller.home.index);
  router.get('/user/list', controller.user.list);
  router.post('/user/register', controller.user.create);
  router.get('/user/login/captcha', controller.user.getCaptcha);
  router.post('/user/login/account', controller.user.login);
  router.post('/user/admin', jwt, controller.user.admin); // 验证token
  router.get('/user/currentUser', jwt, controller.user.currentUser);
};
