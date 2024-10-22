<template>
    <v-container>
        <v-row>
            <v-col>
                {{ $t('game.ready', {player: playerInTurn.name}) }}
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-btn append-icon="mdi-play" color="primary" @click="continueGame()">
                    {{ $t('game.continue') }}
                </v-btn>
            </v-col>
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
