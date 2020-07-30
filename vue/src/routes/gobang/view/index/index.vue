<!-- <template>
  <div>
    <input @change="showTitlt" :value="title" />
    <anchored-heading :title="title"></anchored-heading>
    <button @click="changeTitle">按钮</button>
  </div>
</template>
-->
<script>
import { getInfo } from '@/services/http/gobang'
export default {
  data() {
    return {
      title: `五子棋`,
    };
  },
  beforeCreate: function () {
    getInfo().then(res => {
      console.log(res)
    }).catch( err => {
      console.log(err)
    })
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
    changeTitle: function () {
      this.title = this.title === "连连看" ? "五子棋" : "连连看";
    },
    showTitlt: function (e) {
      console.log("showTitlt", this.title);
    },
  },
  components: {},
  render: function (h) {
    const {
      title
    } = this
    console.log(title);
    return (
      <div>
        {title}
        <br/>
        <button onClick={this.changeTitle}>按钮</button>
      </div>
    );
  },
};
</script>

<style lang="stylus" scoped>
@import './index.styl';
</style>
