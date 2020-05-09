import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home.vue'
import FA from '../components/fa.vue'
import Docs from '../components/docs.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/fa', component: FA },
    { path: '/docs', component: Docs },
]

export default new VueRouter({
    routes, // short for `routes: routes`
})