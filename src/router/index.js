//官方的元件
import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/components/back/Dashboard';
import Login from '@/components/back/Login';
import Products from '@/components/back/Products';
import Coupons from '@/components/back/Coupons';
import Orders from '@/components/back/Orders';
import Normcore from '@/components/front/Normcore';
import Lifestyle from '@/components/front/Lifestyle';
import Byleway from '@/components/front/Byleway';
import BT21 from '@/components/front/BT21';
import MoreStyle from '@/components/front/MoreStyle';
import FrontHome from '@/components/front/FrontHome';
import FrontCheckout from '@/components/front/FrontCheckout';
import FrontCartItems from '@/components/front/FrontCartItems';
import FrontShoppingCart from '@/components/front/FrontShoppingCart';
import FrontEnd from '@/components/front/FrontEnd';
import FrontSingleProduct from '@/components/front/FrontSingleProduct';
import FrontOrder from '@/components/front/FrontOrder';
import GirlsUnique from '@/components/front/GirlsUnique';
import Desinger from '@/components/front/Desinger';
import Daze from '@/components/front/Daze';


//自訂的分頁元件

Vue.use(VueRouter);

export default new VueRouter({
    // linkActiveClass : 'active',
    routes:[
        { //再路由下隨意輸入網址會跳到空白頁，因此需要此段程式碼
            path: '*',
            redirect: '/home',
        },
        {
            path: '/',
            redirect: '/home',
        },
        {
            name: 'Login',//對應的虛擬路徑
            path: '/login',//元件呈現的名稱
            component: Login,//對應的元件
        },
        {
            path: '/',
            name: 'FrontEnd',
            component: FrontEnd,
            children:[
                {
                    path: 'home',
                    name: 'Home',
                    component: FrontHome,
                },
                {
                    path: 'normcore',
                    name: 'Normcore',
                    component: Normcore,
                },
                {
                    path: 'lifestyle',
                    name: 'Lifestyle',
                    component: Lifestyle,
                },
                {
                    path: 'byleway',
                    name: 'Byleway',
                    component: Byleway,
                },
                {
                    path: 'bt21',
                    name: 'BT21',
                    component: BT21,
                },
                {
                    path: 'morestyle',
                    name: 'MoreStyle',
                    component: MoreStyle,
                },
                {
                    path: 'girls_unique',
                    name: 'GirlsUnique',
                    component: GirlsUnique,
                },
                {
                    path: 'desinger',
                    name: 'Desinger',
                    component: Desinger,
                },
                {
                    path: 'daze',
                    name: 'Daze',
                    component: Daze,
                },
                {
                    path: 'front_single_product/:productID',
                    name: 'FrontSingleProduct',
                    component: FrontSingleProduct,
                },
                {
                    path: 'shopping_cart',
                    name: 'shoppingCart',
                    component: FrontShoppingCart,
                    children: [
                        {
                            path: 'front_cart_items',
                            name: 'FrontCartItems',
                            component: FrontCartItems,
                        }, 
                        {
                            path: 'front_order',
                            name: 'FrontOrder',
                            component: FrontOrder,
                        }, 
                        {
                            path: 'front_checkout/:orderId',
                            name: 'FrontCheckout',
                            component: FrontCheckout,
                        },
                    ]
                },
            ]
        },
        {
            path: '/admin',
            name: 'Dashboard',
            component: Dashboard,
            children: [
                {
                    path: 'products',
                    name: 'Products',
                    component: Products,
                    meta: { requiresAuth: true }, //路由訊息
                },
                {
                    path: 'coupons',
                    name: 'Coupons',
                    component: Coupons,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'orders',
                    name: 'Orders',
                    component: Orders,
                    meta: { requiresAuth: true },
                }
            ]
        },
    ]
});