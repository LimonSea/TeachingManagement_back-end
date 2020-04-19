import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/api/user/list', controller.user.list);
  router.post('/api/user/register', controller.user.create);
  router.get('/api/user/login/captcha', controller.user.getCaptcha);
  router.post('/api/user/login/account', controller.user.login);
};
