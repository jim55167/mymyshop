import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/back/Login')
  },
  {
    path: '/',
    name: 'FrondEnd',
    component: () => import('@/views/front/FrondEnd'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/front/FrontHome')
      },
      {
        path: 'normcore',
        name: 'Normcore',
        component: () => import('@/views/front/Normcore')
      },
      {
        path: 'lifestyle',
        name: 'Lifestyle',
        component: () => import('@/views/front/Lifestyle')
      },
      {
        path: 'byleway',
        name: 'Byleway',
        component: () => import('@/views/front/Byleway')
      },
      {
        path: 'bt21',
        name: 'BT21',
        component: () => import('@/views/front/BT21')
      },
      {
        path: 'morestyle',
        name: 'MoreStyle',
        component: () => import('@/views/front/MoreStyle')
      },
      {
        path: 'girls_unique',
        name: 'GirlsUnique',
        component: () => import('@/views/front/GirlsUnique')
      },
      {
        path: 'desinger',
        name: 'Desinger',
        component: () => import('@/views/front/Desinger')
      },
      {
        path: 'daze',
        name: 'Daze',
        component: () => import('@/views/front/Daze')
      },
      {
        path: 'design',
        name: 'Design',
        component: () => import('@/views/front/Design')
      },
      {
        path: 'aboutme',
        name: 'Aboutme',
        component: () => import('@/views/front/Aboutme')
      },
      {
        path: 'service',
        name: 'Service',
        component: () => import('@/views/front/Service')
      },
      {
        path: 'front_single_product/:productID',
        name: 'FrontSingleProduct',
        component: () => import('@/views/front/FrontSingleProduct')
      },
      {
        path: 'shopping_cart',
        name: 'FrontShoppingCart',
        component: () => import('@/views/front/FrontShoppingCart'),
        children: [
          {
            path: 'front_cart_items',
            name: 'FrontCartItems',
            component: () => import('@/views/front/FrontCartItems')
          },
          {
            path: 'front_order',
            name: 'FrontOrder',
            component: () => import('@/views/front/FrontOrder')
          },
          {
            path: 'front_checkout/:orderId',
            name: 'FrontCheckout',
            component: () => import('@/views/front/FrontCheckout')
          }
        ]
      },
      {
        path: '/admin',
        name: 'Dashboard',
        component: () => import('@/views/back/Dashboard'),
        children: [
          {
            path: 'products',
            name: 'Products',
            component: () => import('@/views/back/Products'),
            meta: { requiresAuth: true }
          },
          {
            path: 'coupons',
            name: 'Coupons',
            component: () => import('@/views/back/Coupons'),
            meta: { requiresAuth: true }
          },
          {
            path: 'orders',
            name: 'Orders',
            component: () => import('@/views/back/Orders'),
            meta: { requiresAuth: true }
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
