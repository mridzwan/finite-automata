<template>
    <div>
        <div class="has-text-centered">
            <h1 class="title">
                Documentation
            </h1>
        </div>
        <section class="section">
            <p>The ‘Finite Automata’ is a web application that we have developed using HTML and Vue.js, a JavaScript framework as part of the subject’s assignment requirements. The application has four main features that will focus on conversion from non-deterministic finite automaton (NFA) to deterministic finite automaton (DFA). The features include:</p>
            <div class="content">
                <ul>
                    <li>String testing</li>
                    <li>ε-NFA to NFA</li>
                    <li>NFA to DFA</li>
                    <li>Minimize DFA</li>
                </ul>
            </div>
        </section>
        <div class="has-text-centered">
            <h2 class="subtitle">
                How to use
            </h2>
        </div>
        <section class="section">
            <p>To get started, key in the ε-NFA machine details into the table in FA page.</p><br>
            <img src="../../../img/doc/table-prop.jpg">
            <p>To add alphabets and states, click on the ‘+’ button. The table will generate an empty box for you to fill in. To delete, simply click on the ‘x’ button, next to the input box. The table supports up to 10 alphabets and states. Select a state for the START (initial state) column through a dropdown selection based on your states input; only one state a time is allowed for initial state. Then, select any states for the FINAL (accepting state) column through a dropdown selection.</p><br>
            <p>Next, define the transition table.</p><br>
            <img src="../../../img/doc/table-transition.jpg">
            <p>To define the states, tick the checkboxes in the dropdown on each of the columns. The state checkboxes are automatically generated based on your states input.</p>
            <p>Once you are done with the transition table you may start using the main four features. (Test string, Remove epsilon, NFA to DFA, DFA minimization)</p>
        </section>

        <footer class="footer">
            <div class="content has-text-centered">
                <figure class="image is-64x64 is-inline-block">
                    <a href="https://vuejs.org/" target="_blank"><img alt="Vue.js" src="../../../img/doc/vuejs.png"></a>
                </figure>
                <figure class="image is-64x64 is-inline-block">
                    <a href="https://bulma.io/" target="_blank"><img alt="Bulma.io" src="../../../img/doc/bulma.png"></a>
                </figure>
                <br>
                <p><a href="https://github.com/mridzwan/finite-automata" target="a_blank" class="button"><i class="fab fa-github"></i>&nbsp;GitHub</a></p>
            </div>
        </footer>

    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {},
        mounted() {}
    }
</script>