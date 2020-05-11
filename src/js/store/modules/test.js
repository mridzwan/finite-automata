const state = () => ({
    string: '',
    strings: [],
    paths: [],
    results: []
})

const getters = {
    getPath: (state) => (index, id) => {
        return state.paths[index].find(p => p.id === id)
    },
}

const actions = {
    checkStrings({state, commit, dispatch}) {
        commit('clearPaths')
        state.strings = state.string.split("\n")
        for(var i = 0; i < state.strings.length; i++) 
            dispatch('traverseString', state.strings[i])

        dispatch('updateResults')
    },

    traverseString({commit, rootGetters}, string) {
        let path = [ { id: 0, path: [{ alphabet: '', state: 0 }] } ]
        let traversing = false

        do {
            traversing = false

            for(var i = 0; i < path.length; i++) {

                let t = rootGetters['transition/getTransitionsBySource'](path[i].path[path[i].path.length - 1].state)
                let prev = path[i].path.slice(0, path[i].path.length);
                let traversed = false

                let p = path[i].path.filter(a => a.alphabet !== '')
                let alphabet = rootGetters['fa/getAlphabetByValue'](string.charAt(p.length))
                alphabet = (typeof alphabet !== 'undefined' ? alphabet.id : -1)

                for(var j = 0; j < t.length; j++) {

                    if(!t[j].alphabet && (!p.length || p.length >= string.length)) {
                        // condition for at the beginning of string, or end of string; search for epsilons
                        if(traversed) { // new branch
                            let tmp = path.length
                            path.push({id: tmp, path: prev})
                            path[tmp].path.push({alphabet: '', state: t[j].dest})
                        }
                        else {
                            path[i].path.push({alphabet: '', state: t[j].dest})
                            traversed = true
                        }
                        traversing = true;
                    }

                    if(p.length < string.length) {
                        
                        if(t[j].alphabet == alphabet) {
                            if(traversed) { // new branch
                                let tmp = path.length

                                path.push({id: tmp, path: prev})
                                path[tmp].path.push({alphabet: alphabet, state: t[j].dest})
                            }
                            else {
                                path[i].path.push({alphabet: alphabet, state: t[j].dest})
                                traversed = true
                            }
                            traversing = true;
                        }
                    }
                }
            }
        } while(traversing)
        commit('pushPath', path)
    },

    updateResults({state, commit, rootGetters}) {
        commit('clearResults')
        for(var i = 0; i < state.paths.length; i++) {
            let pass = []
            for(var j = 0; j < state.paths[i].length; j++) {
                let p = state.paths[i][j]
                let count = 0;

                for(var k = 0; k < p.path.length; k++) {
                    if(p.path[k].alphabet !== '') {
                        count++
                    }
                }

                if(count == state.strings[i].length) {
                    let w = p.path.filter(a => a.alphabet !== '')
                    if(!w.length)
                        w = [{ state: -1 }]

                    if(rootGetters['fa/isFinalState'](w[w.length - 1].state) || rootGetters['fa/isFinalState'](p.path[p.path.length - 1].state)) {
                        pass.push(j)
                    }
                }
            }

            commit('pushResult', { id: i, pass: pass })
        }
    }
}

const mutations = {
    pushPath(state, path) {
        state.paths.push(path)
    },
    pushResult(state, result) {
        state.results.push(result)
    },
    clearPaths(state) {
        state.paths = []
    },
    clearResults(state) {
        state.results = []
    },
    setString(state, string) {
        state.string = string
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}