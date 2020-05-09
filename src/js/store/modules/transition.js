const state = () => ({
    transitions: []
})

const getters = {
    getTransitions: (state) => (source, alphabet) => {
        return state.transitions.filter(t => t.source === source && t.alphabet === alphabet)
    },
    getTransitionByIndex: (state) => (source, dest, alphabet) => {
        return state.transitions.findIndex(t => t.source === source && t.dest === dest && t.alphabet === alphabet)
    },
    isTransitionExist: (state, getters) => (source, dest, alphabet) => {
        return (getters.getTransitionByIndex(source, dest, alphabet) != -1)
    }
}

const actions = {
    toggleTransition({state, commit, getters}, transition) {
        let index = getters.getTransitionByIndex(transition.source, transition.dest, transition.alphabet)
        if(index != -1)
            commit('spliceTransition', { start: index, deleteCount: 1 })
        else {
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

    spliceTransition(state, splice) {
        state.transitions.splice(splice.start, splice.deleteCount)
    },

    deleteTransitionsByAlphabet(state, alphabet) {
        state.transitions = state.transitions.filter(t => !(t.alphabet === alphabet))
    },

    deleteTransitionsByState(state, stateFa) {
        state.transitions = state.transitions.filter(t => !(t.source === stateFa || t.dest === stateFa))
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