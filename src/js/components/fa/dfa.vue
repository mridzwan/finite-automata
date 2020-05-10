<template>
    <div>
        DFA
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
                return this.$store.state.fa.initState
            }
        },
        created() {
            if(this.initState == -1)
                this.$router.push({name: 'nfa'})
        }
    }
</script>