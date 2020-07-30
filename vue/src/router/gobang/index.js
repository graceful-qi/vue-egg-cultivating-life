import routesMap from './routesMap'

export default [
  {
    path: routesMap.index,
    name: 'gobang_index',
    component: resolve => require(['@/routes/gobang/view/index'], resolve)
  },
  {
    path: routesMap.allPage,
    redirect: { name: 'gobang_index' }
  }
]
