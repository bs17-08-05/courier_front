import MainPage from "../components/MainPage.vue";
import Signin from "../components/Signin.vue";
import Signup from "../components/Signup.vue";
import MyOrders from "../components/MyOrders.vue"

import Vue from "vue";
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const routes = [{
        path: '/',
        component: MainPage
    },
    {
        path: '/signin',
        name: 'signin',
        component: Signin
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup
    },
    {
        path: '/my_orders',
        name: 'my_orders',
        component: MyOrders,
    }
];
export default new VueRouter({
    mode: 'history',
    routes
})