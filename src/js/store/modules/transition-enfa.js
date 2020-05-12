const state = () => ({
    transitions: [
        { id: 0, source: 0, dest: 1, alphabet: 1 },
        { id: 1, source: 0, dest: 2, alphabet: 2 },
        { id: 2, source: 2, dest: 0, alphabet: 1 },
        { id: 3, source: 2, dest: 1, alphabet: 0 }
    ]
})

const getters = {
    getTransitions: (state) => (source, alphabet) => {
        return state.transitions.filter(t => t.source === source && t.alphabet === alphabet)
    },
    getTransitionsBySource: (state) => (source) => {
        return state.transitions.filter(t => t.source === source)
    },
    getTransitionByIndex: (state) => (source, dest, alphabet) => {
        return state.transitions.findIndex(t => t.source === source && t.dest === dest && t.alphabet === alphabet)
    },
    isTransitionExist: (state, getters) => (source, dest, alphabet) => {
        return (getters.getTransitionByIndex(source, dest, alphabet) != -1)
    },
    getAllTransition: (state) => {
        return state.transitions
    },
    getStateClosure: (state) => (id) => {
        let closure = []
        let tmpClosure = [ [id] ]

        let traversing = false
        do {
            traversing = false
            for(var t = 0; t < tmpClosure.length; t++) {
                let index = tmpClosure[t].length - 1
                let source = tmpClosure[t][index]
                let count = 0
                let transition = state.transitions.filter(t => t.source === source && t.alphabet === 0)

                for(var j = 0; j < transition.length; j++) {
                    // skip epsilon looping 
                    if(transition[j].dest != source) {
                        if(!count) // first occurence, push to the array
                            tmpClosure[t].push(transition[j].dest)
                        else // new array
                            tmpClosure[tmpClosure.length] = [trasition[j].dest]

                        count++
                        traversing = true
                    }
                }
            }
        } while(traversing)

        // merge all arrays to one

        for(var t = 0; t < tmpClosure.length; t++)
            closure = closure.concat(tmpClosure[t].filter((item) => closure.indexOf(item) < 0))

        return closure
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