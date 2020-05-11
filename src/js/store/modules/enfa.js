const state = () => ({
    alphabets: [
        { id: 0, value: 'ε', edit: 0 },
        { id: 1, value: '0', edit: 1 },
        { id: 2, value: '1', edit: 1 },
    ],
    states: [
        { id: 0, value: 'a', edit: 1, final: false },
        { id: 1, value: 'b', edit: 1, final: true },
        { id: 2, value: 'c', edit: 1, final: false },
    ],

    limitAlphabet: 10,
    limitState: 10,
    initState: 0
})

const getters = {
    getState: (state) => (id) => {
        return state.states.find(x => x.id === id)
    },
    getFinalStates: (state) => {
        return state.states.filter(x => x.final === true)
    },
    getAlphabetByValue: (state) => (value) => {
        return state.alphabets.find(a => a.value === value)
    },
    getInitialState: (state) => {
        return state.initState
    },
    isFinalState: (state, getter) => (id) => {
        let s = getter.getState(id)

        if(typeof s !== 'undefined')
            return s.final
        else
            return false
    }
}

const actions = {
    addAlphabet({state, commit}) {
        let newId = 0
        if(state.alphabets.length) newId = state.alphabets[state.alphabets.length - 1].id + 1
        commit('pushAlphabet', { id: newId, value: '', edit: 1 })
    },

    addState({state, commit}) {
        let newId = 0
        if(state.states.length) newId = state.states[state.states.length - 1].id + 1
        commit('pushState', { id: newId, value: '', edit: 1, final: false })
    },

    deleteAlphabet({state, commit}, id) {

        let index = state.alphabets.findIndex(x => x.id === id)
        if(index != -1) {
            commit('transitionEnfa/deleteTransitionsByAlphabet', id, { root: true })
            commit('spliceAlphabet', { start: index, deleteCount: 1 })
        }
    },

    deleteState({state, commit}, id) {

        let index = state.states.findIndex(x => x.id === id)
        if(index != -1) {
            if(state.initState == id)
                state.initState = -1

            commit('transitionEnfa/deleteTransitionsByState', id, { root: true })    
            commit('spliceState', { start: index, deleteCount: 1 })
        }
    },

    clearProperties({commit}) {
        commit('initFA')
    }

}

const mutations = {
    pushAlphabet(state, alphabet) {
        state.alphabets.push(alphabet)
    },

    pushState(state, stateFa) {
        state.states.push(stateFa)
    },

    spliceAlphabet(state, splice) {
        state.alphabets.splice(splice.start, splice.deleteCount)
    },

    spliceState(state, splice) {
        state.states.splice(splice.start, splice.deleteCount)
    },

    initFA(state) {
        state.alphabets = [{ id: 0, value: 'ε', edit: 0 }]
        state.states = []

        state.limitAlphabet = 10
        state.limitState = 10
        state.initState = -1
    },

    setInitState(state, id)  {
        state.initState = id
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}