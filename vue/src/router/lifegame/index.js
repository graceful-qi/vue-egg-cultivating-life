import routesMap from './routesMap'

export default [
  {
    path: routesMap.entrance,
    name: 'lifegame_entrance',
    component: resolve => require(['@/routes/lifegame/view/entrance'], resolve)
  },
  {
    path: routesMap.index,
    name: 'lifegame_index',
    component: resolve => require(['@/routes/lifegame/view/index'], resolve)
  },
  {
    path: routesMap.allPage,
    redirect: { name: 'lifegame_entrance' }
  }
]
