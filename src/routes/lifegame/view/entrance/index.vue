<template>
  <div class="page module-box">
    <div class="title">Welcome</div>
    <form action>
      <div class="login-input">
        <img src="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
        <input type="text" v-model="userName" placeholder="用户名" />
      </div>
      <div class="login-input">
        <img src="http://static.huajuanmall.com/subject/o_1ed3ff88dqt8v7f1or11k9diu6s.png" />
        <input type="passWord" v-model="passWord" placeholder="密码" />
      </div>
    </form>
    <div @click="submitLogin" class="button-skyblue login-button">登陆</div>
  </div>
</template>

<script>
import { Field, Icon, Toast } from 'vant'
import { goH5 } from '@/utils'
import routesMap from '@/router/lifegame/routesMap'
export default {
  data () {
    return {
      userName: '',
      passWord: ''
    }
  },
  components: {
    'vue-input': Field,
    'van-icon': Icon
  },
  methods: {
    // 提交信息
    submitLogin: function () {
      const { passWord, userName } = this.$data
      if (!passWord || !userName) return Toast.fail('请将内容输全')

      window.localStorage.setItem(
        'user',
        JSON.stringify({ userName, passWord })
      )

      goH5({ url: routesMap.index })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
</style>
