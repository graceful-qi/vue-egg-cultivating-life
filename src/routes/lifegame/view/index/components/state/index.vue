<template>
  <div>
    <vue-circle v-model="hp" :rate="rate" size="200px">hp</vue-circle>
    <button @click="submitLogin">加</button>
  </div>
</template>

<script>
import { Circle } from 'vant'
export default {
  data () {
    return {
      hp: 100,
      rate: 10
    }
  },
  components: {
    vueCircle: Circle
  },
  mounted: function () {
    // console.log(this.$data.hp = 0);
  },
  methods: {
    // 提交信息
    submitLogin: function () {
      this.$data.hp+=10
      console.log(this.$data.hp, this.$data.rate)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
</style>
