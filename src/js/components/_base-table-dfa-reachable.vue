<template>
    <div>
        <div class="table-container">

            <p class="has-text-centered-touch has-text-weight-semibold">DFA Reachable states</p><br>
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
                    <tr v-for="(label, index) in getReachableLabels" :key="index">
                        <th class="has-text-centered has-text-white-bis has-background-grey"><span v-if="label.init == true">></span><span v-if="label.final">*</span>{{ label.value }}</th>
                        <td class="has-text-centered has-background-light" v-for="alphabet in alphabets" :key="alphabet.id">
                            {{ getLabel(getLabelByAlphabet(label, alphabet.id)).value }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapState('dfa', ['alphabets', 'states', 'labels', 'initState']),

        ...mapGetters({
            getStateValue: 'dfa/getStateValue', 
            getLabelByAlphabet: 'dfa/getLabelByAlphabet',
            getLabel: 'dfa/getLabel',
            getReachableLabels: 'dfa/getReachableLabels',
            getTransitions: 'transitionNfa/getTransitions'
        }),
    },
    methods: {},
    mounted() {}
};
</script>