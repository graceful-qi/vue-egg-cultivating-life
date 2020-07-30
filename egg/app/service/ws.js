'use strict';

module.exports = {
  
};

// const WebSocket = require('ws');

// const WebSocketServer = WebSocket.Server;

// var ws = new WebSocketServer({
//   port: 9091
// });

// var connNum = [];

// //函数参数，连接的对象
// ws.on("connection", function (socket) {

//   connNum.push(socket);

//   console.log("连接了" + connNum.length);

//   //收到消息发送给每一个人
//   socket.on("message", function (msg) {
//     //广播给所有人
//     for (var i = 0; i < connNum.length; i++) {
//       connNum[i].send(JSON.stringify({
//         code: 200,
//         message: '已连接',
//         connNum: connNum.length
//       }))
//     }
//   })

//   socket.send(JSON.stringify({
//     code: 200,
//     message: '已连接',
//     connNum: connNum.length
//   }));

//   //断开连接
//   socket.on("close", function () {
//     connNum.splice(connNum.indexOf(this), 1);
//   })

// })