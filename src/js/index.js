require('../sass/app.scss');

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import routes from './routes'

const router = new VueRouter({
    routes, // short for `routes: routes`
})

const app = new Vue({
    router
}).$mount('#app')
