import Vue from 'vue'
import Router from 'vue-router'
import LifeGame from './lifegame'
import Gobang from './gobang'

Vue.use(Router)

const routes = []
  .concat(LifeGame)
  .concat(Gobang)
export default new Router({
  routes
})
