import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        enfa: require('./modules/enfa').default,
        nfa: require('./modules/nfa').default,
        dfa: require('./modules/dfa').default,
        transitionEnfa: require('./modules/transition-enfa').default,
        transitionNfa: require('./modules/transition-nfa').default,
        testEnfa: require('./modules/test-enfa').default,
    }
})