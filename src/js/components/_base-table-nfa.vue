<template>
    <div class="table-container">

        <p class="has-text-centered-touch has-text-weight-semibold">NFA</p><br>
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
                <tr v-for="state in states" :key="state.id">
                    <th class="has-text-centered has-text-white-bis has-background-grey"><span v-if="initState == state.id">></span><span v-if="state.final == true">*</span>{{ state.value }}</th>
                    <td class="has-text-centered has-background-light" v-for="alphabet in alphabets" :key="alphabet.id">

                        <span v-for="(transition, index) in getTransitions(state.id, alphabet.id)" :key="transition.id">
                            <span v-if="index != 0">,</span>{{ getState(transition.dest).value }}</span>
                        <span v-show="!getTransitions(state.id, alphabet.id).length">∅</span>

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
        ...mapState('nfa', ['alphabets', 'states', 'initState']),

        ...mapGetters({
            getState: 'nfa/getState', 
            getTransitions: 'transitionNfa/getTransitions'
        }),
    },
    methods: {},
    mounted() {}
};
</script>