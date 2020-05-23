<template>
    <div>
        <div class="columns is-desktop">
            <div class="column"><BaseTableNfa></BaseTableNfa></div>
            <div class="column"><BaseTableDfa></BaseTableDfa></div>
            <div class="column"><BaseTableDfaRelabel></BaseTableDfaRelabel></div>
        </div>
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
        },
        created() {
            if(this.initState == -1)
                this.$router.push({name: 'enfa'})
            else {
                this.$store.dispatch('nfa/convertENFAtoNFA')
                this.$store.dispatch('dfa/convertNFAtoDFA')
            }
        }
    }
</script>