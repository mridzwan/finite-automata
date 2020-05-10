<template>
    <div class="table-container">

        <p class="has-text-centered-touch has-text-weight-semibold">ε-NFA</p><br>
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
                            <span v-if="index != 0">,</span>{{ getState(transition.dest).value }}
                        </span>
                        <span v-show="!getTransitions(state.id, alphabet.id).length">∅</span>

                    </td>
                </tr>
            </tbody>
        </table>
        <div class="has-text-centered-touch">
            <router-link :to="{ name: 'nfa' }" class="button is-rounded"><span class="icon is-small has-text-grey"><i class="fas fa-edit"></i></span>&nbsp;&nbsp;&nbsp;Edit</router-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapState('fa', ['alphabets', 'states', 'initState']),

        ...mapGetters('fa', ['getState']),
        ...mapGetters('transition', ['getTransitions']),
    },
    methods: {},
    mounted() {}
};
</script>