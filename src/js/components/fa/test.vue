<template>
    <div>
        <div class="columns is-desktop">
            <div class="column"><BaseTableNfa></BaseTableNfa></div>
            <div class="column">
                <section class="section">
                    TEST
                </section>

            </div>
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
                return this.$store.state.fa.initState
            }
        },
        created() {
            if(this.initState == -1)
                this.$router.push({name: 'nfa'})
        }
    }
</script>