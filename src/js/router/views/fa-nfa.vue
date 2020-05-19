<template>
    <div>
        <div class="columns is-desktop">
            <div class="column"><BaseTableEnfa></BaseTableEnfa></div>
            <div class="column"><BaseTableNfa></BaseTableNfa></div>
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
            else
                this.$store.dispatch('nfa/convertENFAtoNFA')
        }
    }
</script>