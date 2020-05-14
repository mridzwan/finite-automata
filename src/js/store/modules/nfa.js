const state = () => ({
    alphabets: [],
    states: [],
    initState: -1
})

const getters = {
    getState: (state) => (id) => {
        return state.states.find(x => x.id === id)
    },
    getStateIndex: (state) => (id) => {
        return state.states.findIndex(x => x.id === id)
    },
    getAllAlphabet: (state) => {
        return state.alphabets
    },
    getAllState: (state) => {
        return state.states
    },
    getInitialState: (state) => {
        return state.initState
    }
}

const actions = {
    convertENFAtoNFA({state, getters, dispatch, rootGetters}) {
        state.states = JSON.parse(JSON.stringify(rootGetters['enfa/getAllState']))
        state.alphabets = JSON.parse(JSON.stringify(rootGetters['enfa/getAllAlphabet'].filter(a => a.id !== 0)))
        state.initState = JSON.parse(JSON.stringify(rootGetters['enfa/getInitialState']))
        dispatch('transitionNfa/clearTransition', {}, {root:true})

        for(var s = 0; s < state.states.length; s++) {
            let closure = rootGetters['transitionEnfa/getStateClosure'](state.states[s].id)

            // check if initstate direct to final state with epsilon
            if(state.states[s].id == state.initState) {
                for(var c = 0; c < closure.length; c++) {
                    if(state.states[getters.getStateIndex(closure[c])].final == true) {
                        for(var i = c -1; i >= 0; i--) {
                            state.states[getters.getStateIndex(closure[i])].final = true
                        }
                    }
                }
            }

            for(var a = 0; a < state.alphabets.length; a++) {
                let result = []

                for(var c = 0; c < closure.length; c++) {
                    let transition = rootGetters['transitionEnfa/getTransitions'](closure[c], state.alphabets[a].id)
                    
                    for(var t = 0; t < transition.length; t++) {
                        result.push(transition[t].dest)
                    }
                }

                // remove duplicates, if any
                result = result.filter(function(item, pos) {
                    return result.indexOf(item) == pos;
                })

                let finalResult = []

                // second closure
                for(var r = 0; r < result.length; r++) {
                    finalResult = finalResult.concat(rootGetters['transitionEnfa/getStateClosure'](result[r]))
                }

                // remove duplicates, if any
                finalResult = finalResult.filter(function(item, pos) {
                    return finalResult.indexOf(item) == pos;
                })

                for(var r = 0; r < finalResult.length; r++)
                    dispatch('transitionNfa/adddTransition', { source: state.states[s].id, dest: finalResult[r], alphabet: state.alphabets[a].id }, {root:true})
            }
        }

    },
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