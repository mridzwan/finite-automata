<template>
    <div>
        NO EPSILON
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
        }
    }
</script>