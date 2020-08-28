
<template>
  <div>
    <keep-alive>
      <div v-if="a > 1">2</div>
      <div v-else>{{title}}</div>
      <input type="text" :modal="title" />
    </keep-alive>
    <br />
    <button @click="ddaa">按钮</button>
    <div>
      <p>
        <span></span>
      </p>
    </div>
  </div>
</template>
<!-- -->
<script>
import {
  getInfo,
  // getNul
} from "@/services/http/gobang";
export default {
  data() {  
    return {
      title: `五子棋`,
      a: 2,
    };
  },
  beforeCreate: function () {
    // getNul({
    //   test: 111,
    // }).then((res) => {});
    getInfo()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(`beforeCreate`, this.title, this);
  },
  created: function () {
    console.log(`created`, this.title);
  },
  beforeMount: function () {
    console.log(`beforeMount`, this.title);
  },
  mounted: function () {
    console.log(`mounted`, this.title);
  },
  beforeUpdate: function () {
    console.log(`beforeUpdate`, this.title);
  },
  updated: function () {
    console.log(`updated`, this.title);
  },
  activated: function () {
    console.log(`activated`, this.title);
  },

  methods: {
    changeTitle: function (e) {
      this.title = this.title === "连连看" ? "五子棋" : "连连看";
      console.log("changeTitle", this);

      this.showTitlt(11);
      // this.ddaa(e);
      // this.$options.methods.showTitlt()
      // setTimeout( () => {
      //   console.log(1)
      //   this.showTitlt()
      // }, 0)
    },
    showTitlt: function (xxx) {
      console.log("showTitlt", this.title, xxx);
    },
    ddaa: function (e) {
     this.$store.dispatch('testAe',{age:15})
    },
  },
  components: {},
  // render: function (h) {
  //   const { title } = this;
  //   console.log(title);
  //   return (
  //     <div>
  //       {title}
  //       <br />
  //       <button onClick={this.changeTitle}>按钮</button>
  //     </div>
  //   );
  // },
};
</script>

<style lang="stylus" scoped>
@import './index.styl';

</style>
