<template>
    <div class="main-content">
        <md-dialog-confirm
            :md-active.sync="confirmDialogOpen"
            :md-title="$t('home.dialog.title')"
            :md-content="$t('home.dialog.content')"
            :md-confirm-text="$t('home.dialog.ok')"
            :md-cancel-text="$t('home.dialog.cancel')"
            @md-confirm="confirmStartNewGame"
        />

        <md-button v-if="gameInProgress" class="md-raised md-primary" @click="continueGame()">
            {{ $t('home.continue') }}
        </md-button>
        <md-button class="md-raised md-primary" @click="startNewGame()">
            {{ $t('home.new') }}
        </md-button>
        <md-button :to="{name: 'rules'}" class="md-raised md-accent">
            {{ $t('home.rules') }}
        </md-button>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
    data () {
        return {
            confirmDialogOpen: false,
        };
    },

    computed: {
        ...mapGetters([
            'gameInProgress',
        ]),

        ...mapState([
            'gameState',
        ]),
    },

    methods: {
        continueGame () {
            this.$router.push({ name: this.gameState });
        },

        startNewGame () {
            if (this.gameInProgress) {
                this.confirmDialogOpen = true;
            } else {
                this.$router.push({ name: 'teams' });
            }
        },

        confirmStartNewGame () {
            this.$store.dispatch('stopGame').then(() => {
                this.$router.push({ name: 'teams' });
            });
        },
    },
};
</script>
