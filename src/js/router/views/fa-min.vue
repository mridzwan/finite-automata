<template>
    <div>
        <div class="columns is-desktop">
            <div class="column"><BaseTableDfaReachable></BaseTableDfaReachable></div>
            <div class="column"><BaseTableDfaMinimizations></BaseTableDfaMinimizations></div>
            <div class="column"><BaseTableDfaMinimized></BaseTableDfaMinimized></div>
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