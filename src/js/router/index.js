import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home.vue'
import FA from '../components/fa.vue'
import Docs from '../components/docs.vue'

import FANFA from '../components/fa/nfa.vue'
import FATest from '../components/fa/test.vue'
import FANoEpsilon from '../components/fa/noepsilon.vue'
import FADFA from '../components/fa/dfa.vue'
import FAMin from '../components/fa/min.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { name: 'fa', path: '/fa', component: FA, children: [
        { name: 'nfa', path: '/', component: FANFA },
        { name: 'test', path: 'test', component: FATest },
        { name: 'noepsilon', path: 'noepsilon', component: FANoEpsilon },
        { name: 'dfa', path: 'dfa', component: FADFA },
        { name: 'min', path: 'min', component: FAMin },
    ]},
    { path: '/docs', component: Docs },
]

export default new VueRouter({
    routes, // short for `routes: routes`
})