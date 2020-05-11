import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        enfa: require('./modules/enfa').default,
        transitionEnfa: require('./modules/transition-enfa').default,
        testEnfa: require('./modules/test-enfa').default,
    }
})