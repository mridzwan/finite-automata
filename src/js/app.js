require('../sass/app.scss')

import Vue from 'vue'
import router from './router'
import store from './store'

// Globally register all `_base`-prefixed components
import './components/_globals'

const app = new Vue({
    router,
    store
}).$mount('#app')
