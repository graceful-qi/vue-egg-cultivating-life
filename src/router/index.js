import Vue from 'vue'
import Router from 'vue-router'
import LifeGame from './lifegame'

Vue.use(Router)

const routes = []
  .concat(LifeGame)
export default new Router({
  routes
})
