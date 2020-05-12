const state = () => ({
    transitions: []
})

const getters = {
    getTransitions: (state) => (source, alphabet) => {
        return state.transitions.filter(t => t.source === source && t.alphabet === alphabet)
    },
    isTransitionExist: (state, getters) => (source, dest, alphabet) => {
        return (getters.getTransitionByIndex(source, dest, alphabet) != -1)
    },
}

const actions = {
    adddTransition({state, commit}, transition) {
        if(state.transitions.findIndex(t => t.source === transition.source && t.dest === transition.dest && t.alphabet === transition.alphabet) === -1) {
            let newId = 0
            if(state.transitions.length > 0)
                newId = state.transitions[state.transitions.length - 1].id + 1

            commit('pushTransition', { id: newId, source: transition.source, dest: transition.dest, alphabet: transition.alphabet })    
        }
    },
    clearTransition({commit}) {
        commit('initTransition')
    }
}

const mutations = {
    pushTransition(state, transition) {
        state.transitions.push(transition)
    },
    initTransition(state) {
        state.transitions = []
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}