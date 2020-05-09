import Vue from 'vue'
import Vuex from 'vuex'

import fa from './modules/fa'
import transition from './modules/transition'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        fa,
        transition
    }
})