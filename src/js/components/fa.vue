<template>
  <div>
    
    <div class="table-container">
        <p><span class="has-text-weight-semibold">Step 1</span>: ε-NFA Properties</p><br>
        <table class="table is-bordered is-narrow is-size-6">
            <tbody>
                <tr>
                    <th class="has-text-centered has-text-white-bis has-background-grey"><abbr title="Alphabet">Σ</abbr></th>
                    <td class="has-text-centered has-background-light" v-for="(alphabet, index) in alphabets" :key="alphabet.id">
                        <input type="text" class="input has-text-centered" style="width:3em;" maxlength="2" v-model="alphabet.value" :disabled="alphabet.edit == 0">
                        <span class="is-inline-flex" v-if="alphabet.edit == 1">
                            <button class="delete is-small" v-on:click="deleteAlphabet(index)"></button>
                        </span>
                    </td>
                    <td style="border:0;">
                        <button class="button" v-on:click="addAlphabet()" :disabled="alphabets.length > limitAlphabet">
                            <span class="icon has-text-primary">
                                <i class="fas fa-plus"></i>
                            </span>
                        </button>
                    </td>
                </tr>
                <tr>
                    <th class="has-text-centered has-text-white-bis has-background-grey"><abbr title="Variables (State)">V</abbr></th>
                    
                    <td class="has-text-centered has-background-light" v-for="(state, index) in states" :key="state.id">
                        <input type="text" class="input has-text-centered" style="width:3em;" maxlength="2" v-model="state.value" :disabled="state.edit == 0">
                        <span class="is-inline-flex" v-if="state.edit == 1">
                            <button class="delete is-small" v-on:click="deleteState(index)"></button>
                        </span>
                    </td>

                    <td style="border:0;">
                        <button class="button" v-on:click="addState()" :disabled="states.length > limitState">
                            <span class="icon has-text-primary">
                                <i class="fas fa-plus"></i>
                            </span>
                        </button>
                    </td>
                </tr>
                <tr>
                    <th class="has-text-centered has-text-white-bis has-background-grey"><abbr title="Initial state">START</abbr></th>

                    <td class="has-background-light">
                        <div class="dropdown is-hoverable">
                            <div class="dropdown-trigger">
                                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu-init-state">
                                    <span v-if="initState == -1">∅</span>
                                    
                                    <span v-else>{{ getState(initState).value }}</span>
                                    
                                    <span class="icon is-small">
                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </div>
                            <div class="dropdown-menu" id="dropdown-menu-init-state" role="menu" >
                                <div class="dropdown-content">
                                    <div class="dropdown-item">
                                        <div class="control">
                                            <label class="radio" v-for="(state, index) in states" :key="state.id">
                                                <input type="radio" name="initial_state" :value="state.id" v-model="initState">
                                                {{ state.value }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th class="has-text-centered has-text-white-bis has-background-grey"><abbr title="Final state">FINAL</abbr></th>
                    
                    <td class="has-background-light">
                        <div class="dropdown is-hoverable">
                            <div class="dropdown-trigger">
                                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu-final-state">
                                    
                                    <span v-for="(state, index) in getFinalStates" :key="state">
                                        <span v-if="index != 0">, </span>{{ getState(state.id).value }}
                                    </span>
                                    <span v-show="!getFinalStates.length">∅</span>

                                    <span class="icon is-small">
                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </div>
                            <div class="dropdown-menu" id="dropdown-menu-final-state" role="menu" >
                                <div class="dropdown-content">
                                    <div class="dropdown-item">
                                        <label class="checkbox" v-for="(state, index) in states" :key="state.id">
                                            <input type="checkbox" v-model="state.final">
                                            {{ state.value }}&nbsp;
                                        </label>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>

                </tr>
            </tbody>
        </table>
        <button class="button is-rounded" v-on:click="clearProperties"><span class="icon is-small has-text-grey"><i class="fas fa-redo-alt"></i></span>&nbsp;&nbsp;&nbsp;Reset</button>
        <br><br>
    </div>

    <div class="table-container">
        <p><span class="has-text-weight-semibold">Step 2</span>: Transition Table</p><br>
        <table class="table is-bordered is-narrow is-size-6">
            <thead>
                <tr>
                    <th class="has-text-centered has-text-white-bis has-background-grey">V \ Σ</th>
                    <th class="has-text-centered has-text-white-bis has-background-grey" v-for="alphabet in alphabets" :key="alphabet.id">
                        {{ alphabet.value }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="state in states" :key="state.id">
                    <th class="has-text-centered has-text-white-bis has-background-grey"><span v-if="initState == state.id">></span><span v-if="state.final == true">*</span>{{ state.value }}</th>
                    <td class="has-text-centered has-background-light" v-for="alphabet in alphabets" :key="alphabet.id">

                        <div class="dropdown is-hoverable">
                            <div class="dropdown-trigger">
                                <button class="button" aria-haspopup="true" :aria-controls="'dropdown-menu-transition-' + state.id + '-' + alphabet.id">
                                    
                                    
                                    <span v-for="(transition, index) in getTransition(state.id, alphabet.id)" :key="transition.id">
                                        <span v-if="index != 0">, </span>{{ getState(transition.dest).value }}
                                    </span>
                                    <span v-show="!getTransition(state.id, alphabet.id).length">∅</span>

                                    <span class="icon is-small">
                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </div>
                            <div class="dropdown-menu" :id="'dropdown-menu-transition-' + state.id + '-' + alphabet.id" role="menu" >
                                <div class="dropdown-content">
                                    <div class="dropdown-item">
                                        <label class="checkbox" v-for="(substate, index) in states" :key="substate.id">
                                            <input type="checkbox" v-on:click="toggleTransition(state.id, substate.id, alphabet.id)" :checked="isTransitionExist(state.id, substate.id, alphabet.id)">
                                            {{ substate.value }}&nbsp;
                                        </label>

                                    </div>
                                </div>
                            </div>
                        </div>

                        
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="button is-rounded" v-on:click="clearTransition"><span class="icon is-small has-text-grey"><i class="fas fa-redo-alt"></i></span>&nbsp;&nbsp;&nbsp;Reset</button>
        <br><br>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            alphabets: [{ id: 0, value: 'ε', edit: 0 }],
            states: [],
            transitions: [],

            limitAlphabet: 10,
            limitState: 10,
            initState: -1

        };
    },
    methods: {
        addAlphabet: function() {
            let newId = 0
            let a = this.alphabets
            if(a.length > 0)
                newId = a[a.length - 1].id + 1

            a.push({ id: newId, value: '', edit: 1 })
        },

        addState: function() {
            let newId = 0
            let s = this.states
            if(s.length > 0)
                newId = s[s.length - 1].id + 1

            s.push({
                id: newId,
                value: '',
                edit: 1,
                final: false
            })
        },

        getState: function(id) {
            return this.states.find(x => x.id === id)
        },

        getFinalStates: function() {
            return this.states.filter(x => x.final === true)
        },

        getTransition: function(source, alphabet) {
            return this.transitions.filter(x => x.source === source && x.alphabet === alphabet)
        },

        isTransitionExist: function(source, dest, alphabet) {
            let index = this.transitions.findIndex(x => x.source === source && x.dest === dest && x.alphabet === alphabet)
            return (index != -1);
        },

        toggleTransition: function(source, dest, alphabet) {
            let t = this.transitions
            let index = t.findIndex(x => x.source === source && x.dest === dest && x.alphabet === alphabet)

            if(index != -1)
                t.splice(index, 1)
            else {
                let newId = 0
                if(t.length > 0)
                    newId = t[t.length - 1].id + 1

                t.push({
                    id: newId,
                    source: source,
                    dest: dest,
                    alphabet: alphabet
                })
            }
        },

        deleteAlphabet: function(index) {
            let a = this.alphabets
            let t = this.transitions
            this.transitions = t.filter(x => !(x.alphabet === a[index].id))

            a.splice(index, 1)
        },

        deleteState: function(index) {

            let s = this.states
            let t = this.transitions
            this.transitions = t.filter(x => !(x.source === s[index].id || x.dest === s[index].id))

            if(this.initState == s[index].id)
                this.initState = -1

            s.splice(index, 1)
        },

        clearProperties: function() {
            this.initState = -1
            this.alphabets = [{ id: 0, value: 'ε', edit: 0 }]
            this.states = []
            this.transitions = []
        },

        clearTransition: function() {
            this.transitions = []
        },

    },
    mounted() {}
};
</script>