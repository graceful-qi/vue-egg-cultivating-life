'use strict';

/**
 * @param {Egg.Application} app - egg application
 * // https://eggjs.org/zh-cn/basics/router.html
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  router.get('/home/index', controller.home.index);
  // router.post('/', controller.home.index);
  // router.redirect('/', '/home/index', 302);
  // router.get('/home/:id/:name', controller.home.info);
  // router.get('s', '/search', middleware.uppercase(), controller.search)
  // require()

};
