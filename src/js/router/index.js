import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: require('./views/home.vue').default },
    { path: '/fa', component: require('./views/fa.vue').default, children: [
        { name: 'enfa', path: '/', component: require('./views/fa-enfa.vue').default },
        { name: 'test', path: 'test', component: require('./views/fa-test.vue').default },
        { name: 'nfa', path: 'nfa', component: require('./views/fa-nfa.vue').default },
        { name: 'dfa', path: 'dfa', component: require('./views/fa-dfa.vue').default },
        { name: 'min', path: 'min', component: require('./views/fa-min.vue').default },
    ]},
    { path: '/docs', component: require('./views/docs.vue').default },
]

export default new VueRouter({
    routes, // short for `routes: routes`
})