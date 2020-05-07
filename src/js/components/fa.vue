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
                            <button class="delete is-small" v-on:click="delItem(alphabets, index)"></button>
                        </span>
                    </td>
                    <td style="border:0;">
                        <button class="button" v-on:click="addItem(alphabets)" :disabled="alphabets.length > limit_alphabet">
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
                            <button class="delete is-small" v-on:click="delItem(states, index)"></button>
                        </span>
                    </td>

                    <td style="border:0;">
                        <button class="button" v-on:click="addItem(states)" :disabled="states.length > limit_state">
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
                                    <span v-if="initial_state == -1">∅</span>
                                    
                                    <span v-else>{{ initialState[0].value }}</span>
                                    
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
                                                <input type="radio" name="initial_state" :value="state.id" v-model="initial_state">
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
                                    <span v-if="!finalState.length">∅</span>
                                    
                                    <span v-else v-for="(state, index) in finalState" :key="state.id">
                                        <span v-if="index > 0">,</span>{{ state.value }}
                                    </span>
                                    
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
                <tr v-for="(state) in states" :key="state.id">
                    <th class="has-text-centered has-text-white-bis has-background-grey"><span v-if="initial_state == state.id">></span><span v-if="state.final == true">*</span>{{ state.value }}</th>
                    <td class="has-text-centered" v-for="alphabet in alphabets" :key="alphabet.id">

                        <div class="dropdown is-hoverable">
                            <div class="dropdown-trigger">
                                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu-final-state">
                                    
                                    <span v-if="!getTransition(state.id, alphabet.id).length">∅</span>
                                    <span v-else v-for="(transition, index) in getTransition(state.id, alphabet.id)" :key="transition.id">
                                        <span v-if="index > 0">,</span>{{ getStateById(transition.dest).value }}
                                    </span>
                                    
                                    <span class="icon is-small">
                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </div>
                            <div class="dropdown-menu" id="dropdown-menu-final-state" role="menu" >
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
        <br><br>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            limit_alphabet: 10,
            limit_state: 10,

            alphabets: [
                { id: 0, value: "ε", edit: 0 }
            ],
            states: [],
            transitions: [],
            // { id: 0, source: 1, dest: 2, alphabet: 0 }
            initial_state: -1,
        };
    },
    methods: {
        greet: function (event) {
            // `this` inside methods points to the Vue instance
            alert('Hello world')
        },

        getTransition: function(source, alphabet_id) {
            return this.transitions.filter(function(u) {
                return (u.source == source && u.alphabet == alphabet_id)
            })
        },

        isTransitionExist: function(source, dest, alphabet) {
            var index = this.transitions.filter(function(u) {
                return (u.source == source && u.dest == dest && u.alphabet == alphabet)
            })

            return (index.length > 0);
        },

        getStateById: function(state_id) {
            var id = this.states.filter(function(u) {
                return (u.id == state_id)
            })

            return id[0]
        },

        addItem(type) {

            if(type.length > 0)
                var last_id = type[type.length - 1].id + 1
            else
                var last_id = 0

            type.push({
                id: last_id,
                value: '',
                edit: 1
            })
        },
        delItem(type, index) {

            if(type[index].id == this.initial_state)
                this.initial_state = -1

            type.splice(index, 1)
        },
        toggleTransition(source, dest, alphabet) {
            //var index = this.transitions.filter(function(u) {
            //    return (u.source == source && u.dest == dest && u.alphabet == alphabet)
            //})

            var index = this.transitions.indexOf(this.transitions.find(t => t.source == source && t.dest == dest && t.alphabet == alphabet))

            if(index == -1) {
                if(this.transitions.length > 0)
                    var last_id = this.transitions[this.transitions.length - 1].id + 1
                else
                    var last_id = 0

                this.transitions.push({
                    id: last_id,
                    source: source,
                    dest: dest,
                    alphabet: alphabet
                })
            }
            else {
                this.transitions.splice(index, 1)
            }
        }
    },
    mounted() {},
    computed: {
        initialState: function() {
            var id = this.initial_state
            return this.states.filter(function(u) {
                return (u.id == id)
            })
        },

        finalState: function() {
            return this.states.filter(function(u) {
                return (u.final == true)
            })
        },
    }
};
</script>