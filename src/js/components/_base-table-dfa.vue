<template>
    <div>
        <div class="table-container">

            <p class="has-text-centered-touch has-text-weight-semibold">DFA</p><br>
            <table class="table is-centered-touch is-bordered is-size-6">
                <thead>
                    <tr>
                        <th class="has-text-centered has-text-white-bis has-background-light"></th>
                        <th class="has-text-centered has-text-white-bis has-background-grey"></th>
                        <th class="has-text-centered has-text-white-bis has-background-grey" v-for="alphabet in alphabets" :key="alphabet.id">
                            {{ alphabet.value }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="label in labels" :key="label.id">
                        <td class="has-text-centered has-background-light">{{ label.value }}</td>
                        <th class="has-text-centered has-text-white-bis has-background-grey">
                            <span v-if="label.init == true">></span><span v-if="label.final">*</span>
                            <span v-for="(state, index) in label.states" :key="index"><span v-if="index != 0">,</span>{{ getStateValue(state) }}</span>
                        </th>
                        <td class="has-text-centered has-background-light" v-for="alphabet in alphabets" :key="alphabet.id">
                            <span v-for="(state, index) in getLabel(getLabelByAlphabet(label, alphabet.id)).states" :key="index"><span v-if="index != 0">,</span>{{ getStateValue(state) }}</span>
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
            getTransitions: 'transitionNfa/getTransitions'
        }),
    },
    methods: {},
    mounted() {}
};
</script>