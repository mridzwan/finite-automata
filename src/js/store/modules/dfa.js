const state = () => ({
    alphabets: [],
    states: [],
    labels: [],
    initState: -1
})

const getters = {
    getState: (state) => (id) => {
        return state.states.find(x => x.id === id)
    },
    getStateIndex: (state) => (id) => {
        return state.states.findIndex(x => x.id === id)
    },
    getStateValue: (state) => (id) => {
        if(id != -1)
            return state.states.find(x => x.id === id).value
        else
            return '∅'
    },
    getLabelByAlphabet: (state) => (label, alphabet) => {
        let tlabel = label.transition.find(a => a.alphabet == alphabet)

        if(typeof tlabel !== 'undefined')
            return tlabel.dest
        else
            return 0
    },
    getLabel: (state) => (id) => {
        return state.labels.find(l => l.id == id)
    },
}

const actions = {
    convertNFAtoDFA({state, getters, dispatch, rootGetters}) {
        state.states = JSON.parse(JSON.stringify(rootGetters['nfa/getAllState']))
        state.alphabets = JSON.parse(JSON.stringify(rootGetters['nfa/getAllAlphabet']))
        state.initState = JSON.parse(JSON.stringify(rootGetters['nfa/getInitialState']))

        state.labels = [{ id: 0, value: 'Z', states: [-1], transition:[], final: false, init: false }]
        let temp = []
        let count = 1

        for (var i = 0; i < Math.pow(2, state.states.length); i++) {
            temp = []
            for (var j = 0; j < state.states.length; j++) {
                if ((i & Math.pow(2, j))) 
                    temp.push(state.states[j].id)
            }

            if (temp.length > 0) {
                state.labels.push({ id: count, value: '', states: temp, transition: [], final: false, init: false })

                if(temp.length == 1 && getters.getState(temp[0]).id == state.initState)
                    state.labels[count].init = true
                
                for(var k = 0; k < temp.length; k++) {
                    if(getters.getState(temp[k]).final) {
                        state.labels[count].final = true
                        break
                    }
                }
                count++
            }
        }
        state.labels.sort((a, b) => a.states.length - b.states.length)

        for(var i = 1; i < state.labels.length; i++) {
            state.labels[i].value = String.fromCharCode(i + 64)
            for(var j = 0; j < state.alphabets.length; j++) {
                let transitions = []

                for(var k = 0; k < state.labels[i].states.length; k++) {
                    transitions = transitions.concat(rootGetters['transitionNfa/getTransitions'](state.labels[i].states[k], state.alphabets[j].id))
                }

                var filtered = transitions.map(function(t) {
                    return t.dest
                });

                filtered = filtered.filter(function(item, pos) {
                    return filtered.indexOf(item) == pos;
                })

                for(var l = 1; l < state.labels.length; l++) {
                    if(filtered.length === state.labels[l].states.length && filtered.sort().every(function(value, index) { return value === state.labels[l].states.sort()[index]})) {
                        state.labels[i].transition.push({alphabet: state.alphabets[j].id, dest: state.labels[l].id})
                        break
                    }

                }

                //console.log(state.labels[i].states + ' - ' + state.alphabets[j].value + ' - ' + filtered)
            }
            
        }
        //array1.length === array2.length && array1.sort().every(function(value, index) { return value === array2.sort()[index]});
        //let transitions = rootGetters['transitionNfa/getTransitions'](closure[c], state.alphabets[a].id)

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