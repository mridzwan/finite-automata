<template>
    <div>
        <p class="has-text-centered has-text-weight-semibold">DFA Minimization</p><br>

        <div class="level" v-for="(groups, index) in getMinimizedDFA" :key="index">
            <hr>
            <div class="level-item" v-for="group in groups" :key="group.index">
                <table class="table is-centered-touch is-narrow is-size-6">
                    <thead>
                        <tr>
                            <th :colspan="group.labels.length * alphabets.length" class="has-text-centered">{{ (group.labels.length > 1) ? group.group : '' }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td :colspan="alphabets.length" style="border-width: 1px;" class="has-text-centered" v-for="(label, i) in group.labels" :key="i">{{ getLabel(label).value }}</td>                            
                        </tr>
                        <tr>
                            <td style="border: 0;" v-for="(n, i) in (group.labels.length * alphabets.length)" :key="i"><i class="fas fa-long-arrow-alt-down"></i></td>
                        </tr>
                        <tr>
                            <template v-for="(g, n) in group.labels.length">
                                <template v-for="(a, m) in alphabets.length">
                                    <td>{{ groups[group.transitions[n][m]].group }}</td>
                                </template>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        
 
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
    methods: {},
    mounted() {}
};
</script>