import config from '@/config'

const { webSocketUrl } = config.url
console.log(webSocketUrl)
var websock = null;
var global_callback = null;
var serverPort = '5000';	//webSocket连接端口

class WebSocketService {
  constructor(param = {}) {
    this.param = param
    this.socket = null

  }


}

function getWebIP() {
  var curIP = window.location.hostname;
  return curIP;
}

const initWebSocket = () => { //初始化websocket
  //ws地址
  var wsuri = "ws://" + getWebIP() + ":" + serverPort;
  websock = new WebSocket(wsuri);
  websock.onmessage = function (e) {
    websocketonmessage(e);
  }
  websock.onclose = function (e) {
    websocketclose(e);
  }
  websock.onopen = function () {
    websocketOpen();
  }

  //连接发生错误的回调方法
  websock.onerror = function () {
    console.log("WebSocket连接发生错误");
  }
}

// 实际调用的方法
const sendSock = (agentData, callback) => {
  global_callback = callback;
  if (websock.readyState === websock.OPEN) {
    //若是ws开启状态
    websocketsend(agentData)
  } else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData, callback);
    }, 1000);
  } else {
    // 若未开启，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData, callback);
    }, 1000);
  }
}

//数据接收
const websocketonmessage = (e) => {
  global_callback(JSON.parse(e.data));
}

//数据发送
const websocketsend = (agentData) => {
  websock.send(JSON.stringify(agentData));
}

//关闭
const websocketclose = (e) => {
  console.log("connection closed (" + e.code + ")");
}

const websocketOpen = (e) => {
  console.log("连接成功");
}

initWebSocket();

export default sendSock




// Worker
/**

"use strict";
(
  function () {


    var blockUsers = [], // 被禁言的用户
      _interval;

    onmessage = function (event) {
      var receiveData = event.data;
      switch (receiveData.type) {
        case "init": // 初始化用户
          blockUsers = filterUser(receiveData.data);

          initInterval();
          break;
        case "add": // 添加用户 过滤已存在的用户!!!
          // 判断是添加的一个还是多个
          var newUsers = isArray(receiveData.data) ? receiveData.data : [receiveData.data];
          newUsers = filterUser(newUsers);

          blockUsers.push.apply(blockUsers, newUsers); // 下次轮询会自动计算新的
          testInterval();
          break;
        case "reduce": // 退出房间

          postEvt({
            uid: receiveData.data.uid,
            type: 'reduce',
            needBroadcast: true
          });
          break;
        case "unblock": // 解除禁言

          postEvt({
            uid: receiveData.data.uid
          });
          break;
        case "search": // 搜索某个用户的 禁言时间
          var searchUid = receiveData.data.uid;

          postMessage({
            type: "search",
            uid: searchUid,
            blockTime: findBlockTime(searchUid)
          });
          break;
        default:
          // nothing
          break;
      }
    };

    function initInterval() {
      clearIntervalFun(_interval);
      testInterval();
    }

    // 检测 blockUsers 是否有内容 没有则停止掉定时器
    function testInterval() {

      if (blockUsers.length) {
        if (!_interval) {
          _interval = setInterval(intervalFun, 1000);
        }
      } else {
        clearIntervalFun(_interval);
      }
    }

    // 定时器执行的内容
    function intervalFun() {
      var len = blockUsers.length;

      for (var i = 0; i < len; i++) {
        if (blockUsers[i]) {
          blockUsers[i].live_block_time--;
          if (blockUsers[i].live_block_time - 0 <= 0) {
            postEvt({
              uid: blockUsers[i].uid,
              needBroadcast: true
            });
          }
        }
      }

      // 调试定时器是否在执行
      // postMessage({
      // 	type: "intervalRun"
      // });
    }

    // 清除定时器
    function clearIntervalFun() {
      clearInterval(_interval);
      _interval = '';
    }

    // 筛选被禁言的用户
    function filterUser(users) {
      var users = users || [],
        len = users.length,
        newUsers = [];

      for (var i = 0; i < len; i++) {
        if (users[i].live_block_time - 0 > 0) {
          newUsers.push(users[i]);
        }
      }

      return newUsers;
    }

    // 清理并广播该UID
    function postEvt(params) {

      var uid = params.uid,
        type = params.type || 'blockEnd',
        needBroadcast = params.needBroadcast;


      var _index = getIndex(uid);

      if (_index > -1) { // 清理该禁言到期用户
        blockUsers.splice(_index, 1);
        testInterval();
      }

      if (needBroadcast) {
        postMessage({
          type: type,
          uid: uid
        });
      }
    }

    // 根据uid获取在禁言用户的位置
    function getIndex(uid) {
      var len = blockUsers.length;

      for (var i = 0; i < len; i++) {
        if (blockUsers[i].uid == uid) {
          return i;
        }
      }

      return -1;
    }

    // 根据uid查找禁言时间
    function findBlockTime(uid) {
      var len = blockUsers.length;

      for (var i = 0; i < len; i++) {
        if (blockUsers[i].uid == uid) {
          return blockUsers[i].live_block_time - 0;
        }
      }

      return 0;
    }

    function isArray(object) {
      return object && typeof object === 'object' &&
        typeof object.length === 'number' &&
        typeof object.splice === 'function' &&
        //判断length属性是否是可枚举的 对于数组 将得到false
        !(object.propertyIsEnumerable('length'));
    }
  }
)();



//


<script type="lslsls" id="worker">
  "use strict";(function(){var blockUsers=[],messageArr=[],_interval,messInterval;onmessage=function(c){var b=c.data;switch(b.type){case"init":blockUsers=filterUser(b.data);initInterval();break;case"openInterval":ageInterval();break;case"addMessage":messageArr.push(b.data);break;case"add":var a=isArray(b.data)?b.data:[b.data];a=filterUser(a);blockUsers.push.apply(blockUsers,a);testInterval();break;case"reduce":postEvt({uid:b.data.uid,type:"reduce",needBroadcast:true});break;case"unblock":postEvt({uid:b.data.uid});break;case"search":var d=b.data.uid;postMessage({type:"search",uid:d,blockTime:findBlockTime(d)});break;default:break}};function initInterval(){clearIntervalFun(_interval);testInterval()}function ageInterval(){messInterval = setInterval(function () { postMessage({ type: "receiveMessage", data: messageArr }); messageArr = []; clearInterval(messInterval) }, 1000)}function testInterval(){if(blockUsers.length){if(!_interval){_interval = setInterval(intervalFun, 1000)}}else{clearIntervalFun(_interval)}}function intervalFun(){var a=blockUsers.length;for(var b=0;b<a; {if(blockUsers[b]){blockUsers[b].live_block_time--;if(blockUsers[b].live_block_time-0<=0){postEvt({ uid: blockUsers[b].uid, needBroadcast: true })}}}}function clearIntervalFun(){clearInterval(_interval);_interval=""}function filterUser(d){var d=d||[],b=d.length,a=[];for(var c=0;c<b; {if(d[c].live_block_time-0>0){a.push(d[c])}}return a}function postEvt(e){var a=e.uid,c=e.type||"blockEnd",b=e.needBroadcast;var d=getIndex(a);if(d>-1){blockUsers.splice(d, 1);testInterval()}if(b){postMessage({ type: c, uid: a })}}function getIndex(c){var a=blockUsers.length;for(var b=0;b<a; {if(blockUsers[b].uid==c){return b}}return -1}function findBlockTime(c){var a=blockUsers.length;for(var b=0;b<a; {if(blockUsers[b].uid==c){return blockUsers[b].live_block_time-0}}return 0}function isArray(a){return a&&typeof a==="object"&&typeof a.length==="number"&&typeof a.splice==="function"&&!(a.propertyIsEnumerable("length"))};})();
    </script>

//  */