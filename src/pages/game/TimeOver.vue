<template>
    <v-container>
        <v-row align="center" justify="start">
            {{ $t('game.time-over') }}
        </v-row>

        <v-row align="center" justify="start">
            <v-btn append-icon="mdi-play" color="primary" @click="continueGame()">
                {{ $t('game.continue') }}
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
import {mapState} from 'vuex';
import mp3 from '../../assets/sounds/ringing.mp3';

const sound = new Audio(mp3);

export default {
    computed: mapState([
        'settings',
    ]),

    mounted() {
        this.playSound();
    },

    methods: {
        continueGame() {
            this.$router.replace({name: 'game-results'});
        },

        playSound() {
            if (this.settings.sounds) {
                sound.play();
            }
        },
    },
};
</script>
