import './css/site.css';
import 'bootstrap';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: require('./components/home/home.vue.html') },
    { path: '/counter', component: require('./components/counter/counter.vue.html') },
    { path: '/fetchdata', component: require('./components/fetchdata/fetchdata.vue.html') },
    { path: '/login', component: require('./components/login/login.vue.html') },
    { 
        path: '/orders', 
        component: require('./components/orders/orders.vue.html'),
        meta: { requiresAuth: true }
    },
    { 
        path: '/order/edit/:id', 
        component: require('./components/orderedit/orderedit.vue.html'),
        meta: { requiresAuth: true }
    },
    { 
        path: '/order/new', 
        component: require('./components/orderedit/orderedit.vue.html'),
        meta: { requiresAuth: true }
    }
];

const router = new VueRouter({ mode: 'history', routes: routes });

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.requiresAuth) {
        store.dispatch('auth/checkAuth').then(authResult => {
            if (!authResult) {
                next({ path: '/login', query: { redirect: to.fullPath } });
                return;
            }
            next();
        });
    } else {
        next();
    }
});

new Vue({
    el: '#app-root',
    router: router,
    store: store,
    render: h => h(require('./components/app/app.vue.html'))
});
