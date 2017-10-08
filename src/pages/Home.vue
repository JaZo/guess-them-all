<template>
    <div class="main-content">
        <md-button class="md-raised md-primary" v-if="gameInProgress" @click="continueGame()">
            Continue game
        </md-button>
        <md-button class="md-raised md-primary" @click="startNewGame()">
            Start new game
        </md-button>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';

    export default {
        methods: {
            continueGame() {
                this.$router.push({name: this.gameState});
            },
            startNewGame() {
                this.$router.push({name: 'teams'});
            }
        },
        computed: {
            ...mapGetters([
                'gameInProgress'
            ]),
            ...mapState([
                'gameState'
            ])
        }
    }
</script>
