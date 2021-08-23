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
    redirect: '/demo',
  },
  {
    path: '/demo',
    name: 'Card',
    component: () =>
      import(/* webpackChunkName: "index" */ '../views/Card/Index'),
    redirect: '/demo/payment',
    children: [
      {
        path: 'payment',
        name: 'chooseGoods',
        component: () =>
          import(/* webpackChunkName: "info" */ '../views/Card/ChooseGoods'),
      },
      {
        path: 'chooseRule',
        name: 'chooseRule',
        component: () =>
          import(/* webpackChunkName: "info" */ '../views/Card/ChooseRule'),
      },
      {
        path: 'pay',
        name: 'advCash',
        component: () =>
          import(/* webpackChunkName: "info" */ '../views/Card/AdvCash'),
      },
      {
        path: 'advGoods',
        name: 'advGoods',
        component: () =>
          import(/* webpackChunkName: "info" */ '../views/Card/AdvGoods'),
      },
      {
        path: 'advCollection',
        name: 'advCollection',
        component: () =>
          import(/* webpackChunkName: "info" */ '../views/Card/AdvCollection'),
      },
      // {
      //   path: 'test_pay_SDK',
      //   name: 'test_pay_SDK',
      //   component: () =>
      //     import(/* webpackChunkName: "info" */ '../views/Card/TestPaySDK'),
      // },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})

export default router
