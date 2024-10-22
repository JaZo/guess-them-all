<template>
    <v-container>
        <v-progress-linear :model-value="progress" color="primary"/>

        <v-list>
            <v-list-item v-for="(entity, index) in entities" :key="index">
                <v-list-item-title>{{ entity }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-container>
</template>

<script>
import {mapMutations, mapState} from 'vuex';
import mp3 from '../../assets/sounds/ticking.mp3';

const sound = new Audio(mp3);

const PROGRESS_TICKS_PER_SECOND = 15; // i.e. FPS for progress bar
const SOUND_LENGTH = 5; // in seconds

export default {
    data() {
        return {
            interval: null,
            progressCounter: this.$store.state.time * PROGRESS_TICKS_PER_SECOND,
        };
    },

    computed: {
        ...mapState([
            'entities',
            'settings',
            'time',
        ]),

        progress() {
            return this.progressCounter / PROGRESS_TICKS_PER_SECOND / this.settings.timeLimit * 100;
        },
    },

    mounted() {
        this.interval = setInterval(this.loop, 1000 / PROGRESS_TICKS_PER_SECOND);
    },

    beforeDestroy() {
        clearInterval(this.interval);
        this.stopSound();
    },

    methods: {
        ...mapMutations([
            'setTime',
        ]),

        loop() {
            this.progressCounter = Math.min(this.progressCounter + 1, PROGRESS_TICKS_PER_SECOND * this.settings.timeLimit);

            if (this.progressCounter % PROGRESS_TICKS_PER_SECOND === 0) {
                this.setTime(Math.min(Math.floor(this.progressCounter / PROGRESS_TICKS_PER_SECOND), this.settings.timeLimit));
            }

            if (this.time >= (this.settings.timeLimit - SOUND_LENGTH)) {
                this.playSound();
            }

            if (this.progressCounter >= PROGRESS_TICKS_PER_SECOND * this.settings.timeLimit) {
                clearInterval(this.interval);
                this.continueGame();
            }
        },

        continueGame() {
            this.$router.replace({name: 'game-time-over'});
        },

        playSound() {
            if (this.settings.sounds) {
                sound.play();
            }
        },

        stopSound() {
            if (this.settings.sounds) {
                sound.pause();
            }
        },
    },
};
</script>
