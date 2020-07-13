import routesMap from './routesMap'

export default [
  {
    path: routesMap.entrance,
    name: 'Entrance',
    component: resolve => require(['@/routes/lifegame/view/entrance'], resolve)
  },
  {
    path: routesMap.lifegame,
    redirect: { name: 'Entrance' }
  }
]
