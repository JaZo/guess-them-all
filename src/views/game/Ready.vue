<template>
    <div>
        <div class="main-content md-subheading">{{ $t('game.ready', {player: playerInTurn.name}) }}</div>

        <md-button class="md-raised md-primary" @click="continueGame()">
            {{ $t('game.continue') }}
            <md-icon>play_arrow</md-icon>
        </md-button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: mapGetters([
        'teamInTurn',
        'playerInTurn',
    ]),

    methods: {
        continueGame () {
            this.$store.dispatch('startRound').then(() => {
                this.$router.replace({ name: 'game-game' });
            });
        },
    },
};
</script>
