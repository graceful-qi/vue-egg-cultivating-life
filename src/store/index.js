import Vue from 'vue'
import Vuex from 'vuex'

// 挂载Vuex
Vue.use(Vuex)

// 创建VueX对象
const store = new Vuex.Store({
  state: {
    name: 'helloVueX'
  },
  mutations: { // 同步处理
    edit (state, payload) {
      Vue.set(state, 'age', payload.age) // $set
      Vue.delete(state, 'age')
    }
    // this.$store.commit('edit',{age:15,sex:'男'})
  },
  getters: {
    nameInfo (state) {
      return '姓名:' + state.name
    },

    fullInfo (state, getters) {
      return getters.nameInfo + '年龄:' + state.age
    }
    // this.$store.getters.fullInfo
  },
  actions: { // 异步 同mutations
    aEdit (context, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('edit', payload)
          resolve()
        }, 2000)
      })
    }
    // this.$store.dispatch('aEdit',{age:15})
  }
})

export default store
