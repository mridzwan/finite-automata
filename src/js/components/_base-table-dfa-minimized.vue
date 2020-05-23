<template>
    <div class="table-container">
        <p class="has-text-centered-touch has-text-weight-semibold">Minimized DFA</p><br>

        <table class="table is-centered-touch is-bordered is-size-6">
            <thead>
                <tr>
                    <th class="has-text-centered has-text-white-bis has-background-grey"></th>
                    <th class="has-text-centered has-text-white-bis has-background-grey" v-for="alphabet in alphabets" :key="alphabet.id">
                        {{ alphabet.value }}
                    </th>
                </tr>
            </thead>
                <tbody>
                    <tr v-for="(group, index) in minimizedDFA()" :key="index">
                        <th class="has-text-centered has-text-white-bis has-background-grey"><span v-if="isMinInit(group)">></span><span v-if="isMinFinal(group)">*</span>{{ group.group }}</th>

                        <td class="has-text-centered has-background-light" v-for="(a, m) in alphabets.length" :key="m">
                            {{ minimizedDFA()[group.transitions[0][m]].group }}
                        </td>
            
                    </tr>
                </tbody>
            </table>        
 
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapState('dfa', ['alphabets']),
        ...mapGetters({
            getMinimizedDFA: 'dfa/getMinimizedDFA', 
            getLabel: 'dfa/getLabel'
        }),
    },
    methods: {
        minimizedDFA: function() {
            let min = this.getMinimizedDFA
            return min[min.length - 1]
        },
        isMinInit: function(group) {
            for(var i = 0; i < group.labels.length; i++) {
                if(this.getLabel(group.labels[i]).init == true)
                    return true
            }
        },
        isMinFinal: function(group) {
            for(var i = 0; i < group.labels.length; i++) {
                if(this.getLabel(group.labels[i]).final == true)
                    return true
            }
        },
    },
    mounted() {}
};
</script>