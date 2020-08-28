<template>
  <div class="page module-box">
    <!-- <user-state /> -->
    红警
    <button>aaa</button>
  </div>
</template>

<script>
import { goH5 } from "@/utils";
import routesMap from "@/router/lifegame/routesMap";
import state from "./components/state";
export default {
  data() {
    return {
      userName: "",
      passWord: ""
    };
  },
  components: {
    userState: state
  },
  methods: {
    // 提交信息
    submitLogin: function() {
      const { passWord, userName } = this.$data;
      window.localStorage.setItem(
        "user",
        JSON.stringify({ userName, passWord })
      );
      goH5({ url: routesMap.index });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './index.styl';
</style>
