<template>
    <div class="main-content">
        <md-dialog-confirm
            ref="confirmDialog"
            :md-title="$t('home.dialog.title')"
            :md-content="$t('home.dialog.content')"
            :md-ok-text="$t('home.dialog.ok')"
            :md-cancel-text="$t('home.dialog.cancel')"
            @close="confirmDialogClosed"
        />

        <md-button class="md-raised md-primary" v-if="gameInProgress" @click="continueGame()">
            {{ $t('home.continue') }}
        </md-button>
        <md-button class="md-raised md-primary" @click="startNewGame()">
            {{ $t('home.new') }}
        </md-button>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'gameInProgress'
            ]),

            ...mapState([
                'gameState'
            ])
        },

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
        }
    }
</script>
