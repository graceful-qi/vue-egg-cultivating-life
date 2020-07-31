'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    const data = await app.mysql.get('user', { id: 1 });
    console.log(data)
    // const results = await this.app.mysql.select('user', { // 搜索 post 表
    //   where: { id: 1, author: ['author1', 'author2'] }, // WHERE 条件
    //   columns: ['author', 'title'], // 要查询的表字段
    //   orders: [['created_at','desc'], ['id','desc']], // 排序方式
    //   limit: 10, // 返回数据量
    //   offset: 0, // 数据偏移量
    // });
    const obj = { code: 200, data }
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