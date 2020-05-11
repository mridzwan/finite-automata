<template>
    <div>
        <div class="columns is-desktop">
            <div class="column"><BaseTableEnfa></BaseTableEnfa></div>
            <div class="column">
                <p class="has-text-centered-touch has-text-weight-semibold">Test string</p><br>
                <textarea id="test-string" class="textarea" placeholder="e.g. 11000110" v-model="string">''</textarea><br>
                <div class="has-text-centered-touch">
                    <button class="button is-rounded" v-on:click="checkStrings"><span class="icon is-small has-text-grey"><i class="fas fa-clipboard-check" aria-hidden="true"></i></span>&nbsp;&nbsp;&nbsp;Check</button>
                </div>

                <section class="section">
                    <div class="container">
                        <p class="has-text-centered-touch has-text-weight-semibold">Results</p><br>
                        <div class="content">
                            <dl>
                                <dt v-for="(result, index) in results" :key="index">
                                    {{ strings[index] }}&nbsp;&nbsp;
                                    <span v-if="!result.pass.length">
                                        <span class="icon has-text-warning">
                                            <i class="fas fa-exclamation-triangle"></i>
                                        </span>
                                        <span class="has-text-danger has-text-weight-semibold">Rejected</span>
                                    </span>
                                    <span v-else>
                                        <span class="icon has-text-success">
                                            <i class="fas fa-check-square"></i>
                                        </span>
                                        <span class="has-text-success has-text-weight-semibold">Accepted</span>
                                        <span>
                                            <dd v-for="(path, indexp) in result.pass" :key="indexp">
                                                <div v-html="printTraverse(index, path)" class="has-text-grey"></div>
                                            </dd>
                                        </span>
                                    </span>
                                </dt>
                            </dl>
                        </div>

                    </div>
                </section>

                

            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions('testEnfa', ['checkStrings']),

        printTraverse: function(index, pathid) {
            let p = this.getPath(index, pathid)
            let string = ''

            for(var i = 0; i < p.path.length; i++) {
                string += ' -> '
                string += this.getState(p.path[i].state).value
            }

            return string
        }
    },
    computed: {
        ...mapState('testEnfa', ['strings', 'paths', 'results']),

        ...mapGetters('testEnfa', ['getPath']),
        ...mapGetters('enfa', ['getState']),

        initState () {
            return this.$store.state.enfa.initState
        },
        string: {
            get() {
                return this.$store.state.testEnfa.string
            },
            set(string) {
                this.$store.commit('testEnfa/setString', string)
            }
        },
    },
    created() {
        if(this.initState == -1)
            this.$router.push({name: 'enfa'})
    }
}
</script>