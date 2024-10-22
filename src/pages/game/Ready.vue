<template>
    <v-container>
        <v-row align="center" justify="start">
            {{ $t('game.ready', {player: playerInTurn.name}) }}
        </v-row>

        <v-row align="center" justify="start">
            <v-btn append-icon="mdi-play" color="primary" @click="continueGame()">
                {{ $t('game.continue') }}
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    computed: mapGetters([
        'teamInTurn',
        'playerInTurn',
    ]),

    methods: {
        continueGame() {
            this.$store.dispatch('startRound').then(() => {
                this.$router.replace({name: 'game-game'});
            });
        },
    },
};
</script>
