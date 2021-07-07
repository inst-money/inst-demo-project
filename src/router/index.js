import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error)
}

const routes = [
  {
    path: '/',
    redirect: '/card',
  },
  {
    path: '/card',
    name: 'Card',
    component: () =>
      import(/* webpackChunkName: "index" */ '../views/Card/Index'),
    redirect: '/card/chooseRule',
    children: [
      {
        path: 'chooseRule',
        name: 'chooseRule',
        component: () =>
          import(/* webpackChunkName: "info" */ '../views/Card/ChooseRule'),
      },
      {
        path: 'advCash',
        name: 'advCash',
        component: () =>
          import(/* webpackChunkName: "info" */ '../views/Card/AdvCash'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})

export default router
