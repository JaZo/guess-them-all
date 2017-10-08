<template>
    <div class="main-content">
        <md-dialog-confirm
                md-title="Are you sure you want to start a new game?"
                md-content="The current game will be stopped and all progress will be lost."
                md-ok-text="Yes"
                md-cancel-text="No"
                @close="confirmDialogClosed"
                ref="confirmDialog">
        </md-dialog-confirm>

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
                if (this.gameInProgress) {
                    this.$refs.confirmDialog.open();
                } else {
                    this.$router.push({name: 'teams'});
                }
            },
            confirmDialogClosed(type) {
                if (type === 'ok') {
                    this.$store.dispatch('stopGame').then(() => {
                        this.$router.push({name: 'teams'});
                    });
                }
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
