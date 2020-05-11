<template>
    <div>
        <div class="columns is-desktop">
            <div class="column">
                <div class="table-container">
                    <p class="has-text-centered-touch has-text-weight-semibold">ε-NFA Properties</p><br>
                    <table class="table is-centered-touch is-bordered is-narrow is-size-6">
                        <tbody>
                            <tr>
                                <th class="has-text-centered has-text-white-bis has-background-grey"><abbr title="Alphabet">Σ</abbr></th>
                                <td class="has-text-centered has-background-light" v-for="alphabet in alphabets" :key="alphabet.id">
                                    <input type="text" class="input has-text-centered" style="width:3em;" maxlength="1" v-model="alphabet.value" :disabled="alphabet.edit == 0">
                                    <span class="is-inline-flex" v-if="alphabet.edit == 1">
                                        <button class="delete is-small" v-on:click="deleteAlphabet(alphabet.id)"></button>
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
                                
                                <td class="has-text-centered has-background-light" v-for="state in states" :key="state.id">
                                    <input type="text" class="input has-text-centered" style="width:3em;" maxlength="2" v-model="state.value" :disabled="state.edit == 0">
                                    <span class="is-inline-flex" v-if="state.edit == 1">
                                        <button class="delete is-small" v-on:click="deleteState(state.id)"></button>
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
                                                        <label class="radio" v-for="state in states" :key="state.id">
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
                                                
                                                <span v-for="(state, index) in getFinalStates" :key="state.id">
                                                    <span v-if="index != 0">,</span>{{ getState(state.id).value }}
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
                                                    <label class="checkbox" v-for="state in states" :key="state.id">
                                                        <input type="checkbox" :value="state.id" v-model="state.final">{{ state.value }}&nbsp;
                                                    </label>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    <div class="has-text-centered-touch">
                        <button class="button is-rounded" v-on:click="clearTable()"><span class="icon is-small has-text-grey"><i class="fas fa-redo-alt"></i></span>&nbsp;&nbsp;&nbsp;Reset</button>
                    </div>
                    <br><br>
                </div>
            </div>
            <div class="column">
                <div class="table-container">
                    <p class="has-text-centered-touch has-text-weight-semibold">Transition Table</p><br>
                    <table class="table is-centered-touch is-bordered is-narrow is-size-6">
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
                                                
                                                
                                                <span v-for="(transition, index) in getTransitions(state.id, alphabet.id)" :key="transition.id">
                                                    <span v-if="index != 0">,</span>{{ getState(transition.dest).value }}
                                                </span>
                                                <span v-show="!getTransitions(state.id, alphabet.id).length">∅</span>

                                                <span class="icon is-small">
                                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                        </div>
                                        <div class="dropdown-menu" :id="'dropdown-menu-transition-' + state.id + '-' + alphabet.id" role="menu" >
                                            <div class="dropdown-content">
                                                <div class="dropdown-item">
                                                    <label class="checkbox" v-for="substate in states" :key="substate.id">
                                                        <input type="checkbox" v-on:change="toggleTransition({source: state.id, dest: substate.id, alphabet: alphabet.id})" :checked="isTransitionExist(state.id, substate.id, alphabet.id)">
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
                    <div class="has-text-centered-touch">
                        <button class="button is-rounded" v-on:click="clearTransition"><span class="icon is-small has-text-grey"><i class="fas fa-redo-alt"></i></span>&nbsp;&nbsp;&nbsp;Reset</button>
                    </div>
                    <br><br>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState('enfa', ['alphabets', 'states', 'limitAlphabet', 'limitState']),
        ...mapState('transitionEnfa', ['transitions']),

        ...mapGetters('enfa', ['getState', 'getFinalStates']),
        ...mapGetters('transitionEnfa', ['getTransitions', 'isTransitionExist']),

        initState: {
            get() {
                return this.$store.state.enfa.initState
            },
            set(stateid) {
                this.$store.commit('enfa/setInitState', stateid)
            }
        },
    },
    methods: { 
        ...mapActions('enfa', ['addAlphabet','addState','deleteAlphabet','deleteState','clearProperties']),
        ...mapActions('transitionEnfa', ['toggleTransition', 'clearTransition']),

        clearTable: function() {
            this.clearProperties()
            this.clearTransition()
        }
    },
    mounted() {}
};
</script>