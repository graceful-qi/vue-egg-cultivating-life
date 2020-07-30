'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const obj = { code: 200, mes: 'hi, egg' }
    ctx.body = JSON.stringify(obj);
  }


  async info() {
    const { ctx } = this;
    // /home/:id/:name
    ctx.body = `user: ${ctx.params.id}, ${ctx.params.name}`;
    // /home?id=xxx
    ctx.body = `id: ${ctx.query.id}`;

  }
}

// // app/controller/user.js
// exports.info = async ctx => {
//   ctx.body = `user: ${ctx.params.id}, ${ctx.params.name}`;
// };

module.exports = HomeController;