<template>
    <div>
        <div class="buttons has-addons is-centered">
            <router-link :to="{ name: 'test' }" active-class="is-info is-selected" class="button" :disabled="initState === -1">
                <span class="icon is-small"><i class="fas fa-clipboard-check" aria-hidden="true"></i></span>
                <span>Test</span>
            </router-link>
            <router-link :to="{ name: 'nfa' }" active-class="is-info is-selected" class="button" :disabled="initState === -1">
                <span class="icon is-small"><i class="fas fa-ban" aria-hidden="true"></i></span>
                <span>No ε</span>
            </router-link>
            <router-link :to="{ name: 'dfa' }" active-class="is-info is-selected" class="button" :disabled="initState === -1">
                <span class="icon is-small"><i class="fas fa-exchange-alt" aria-hidden="true"></i></span>
                <span>DFA</span>
            </router-link>
            <router-link :to="{ name: 'min' }" active-class="is-info is-selected" class="button" :disabled="initState === -1">
                <span class="icon is-small"><i class="fas fa-minus-square" aria-hidden="true"></i></span>
                <span>Min</span>
            </router-link>
        </div>
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {},
    mounted() {},
    computed: {
        initState () {
            return this.$store.state.enfa.initState
        }
    }
}
</script>