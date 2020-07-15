<template>
  <div>
    <div class="user-name">
      <img src="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
      憨憨
    </div>
    <div class="user-wealth">
      <p>灵石：200 </p>
      <div><van-icon name="arrow" class="wealth-more" /></div>
    </div>
    <div class="state" v-for="(item, index) in userState" :key="index">
      <div class="label">{{item.name}}：</div>
      <vue-progress
        :percentage="item.value/item.maxValue * 100"
        :color="item.color"
        stroke-width="0.2rem"
        :pivot-text="`${item.value}/${item.maxValue}`"
        :pivot-color="item.pivotColor"
        class="vue-progress"
      />
    </div>
    <button @click="submitLogin">加</button>
  </div>
</template>

<script>
import { Progress, Icon } from "vant";
export default {
  data() {
    return {
      userState: [
        {
          name: `血量`,
          percentage: 30,
          color: "#FF0000",
          value: 10,
          textColor: "#FFF",
          pivotColor: "#FF0000",
          maxValue: 200
        },
        {
          name: `灵力`,
          percentage: 30,
          color: "#0000CD",
          value: 10,
          textColor: "#FFF",
          pivotColor: "#0000CD",
          maxValue: 200
        },
        {
          name: `魂力`,
          percentage: 30,
          color: "#00008B",
          value: 10,
          pivotColor: "#00008B",
          textColor: "#fff",
          maxValue: 200
        }
      ]
    };
  },
  components: {
    vueProgress: Progress,
    vanIcon: Icon
  },
  mounted: function() {
    // console.log(this.$data.hp = 0);
  },
  methods: {
    // 提交信息
    submitLogin: function() {
      this.$data.userState[0].value += 10;
      this.$data.userState[1].value += 10;
      this.$data.userState[2].value += 10;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './index.styl';
</style>
