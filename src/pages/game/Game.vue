<template>
    <div class="page play">
        <div class="play__header">
            <div class="play__heading">
                <span class="text-section-label on-surface-variant">{{ teamInTurn.name }}</span>
                <span class="play__title font-display">{{ $t('game.describing', {player: playerInTurn.name}) }}</span>
            </div>
            <div class="play__timer" role="timer" :aria-label="$t('game.time-left', {seconds: remaining})">
                <v-progress-circular
                    :model-value="progress"
                    :size="120"
                    :width="10"
                    bg-color="surface-container-highest"
                    color="secondary-container"
                />
                <div class="play__timer-text">
                    <span class="play__seconds font-display">{{ remaining }}</span>
                    <span class="play__sec on-surface-variant">{{ $t('game.sec') }}</span>
                </div>
            </div>
        </div>

        <ol class="page__body play__words">
            <li v-for="(entity, index) in entities" :key="index" class="play__word bg-surface-container rounded-xl">
                <span class="play__word-number bg-primary-container">{{ index + 1 }}</span>
                <span class="play__word-text">{{ entity }}</span>
            </li>
        </ol>

        <div class="play__donts on-surface-variant">
            <span v-for="key in donts" :key="key" class="play__dont">
                <v-icon icon="mdi-cancel" size="14"/>
                {{ $t(`game.donts.${key}`) }}
            </span>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex';
import {useWakeLock} from '@vueuse/core';
import mp3 from '../../assets/sounds/ticking.mp3';

const sound = new Audio(mp3);

const PROGRESS_TICKS_PER_SECOND = 15; // i.e. FPS for progress bar
const SOUND_LENGTH = 5; // in seconds

export default {
    setup() {
        const { request, release } = useWakeLock();

        return {
            requestWakeLock: request,
            releaseWakeLock: release,
        };
    },

    data() {
        return {
            interval: null,
            progressCounter: this.$store.state.time * PROGRESS_TICKS_PER_SECOND,
            donts: ['names', 'rhymes', 'letters', 'pointing'],
        };
    },

    computed: {
        ...mapState([
            'entities',
            'settings',
            'time',
        ]),

        ...mapGetters([
            'teamInTurn',
            'playerInTurn',
        ]),

        // Remaining time as a percentage, so the ring shrinks as time runs out
        progress() {
            return 100 - this.progressCounter / PROGRESS_TICKS_PER_SECOND / this.settings.timeLimit * 100;
        },

        remaining() {
            return Math.max(0, this.settings.timeLimit - this.time);
        },
    },

    mounted() {
        this.interval = setInterval(this.loop, 1000 / PROGRESS_TICKS_PER_SECOND);
        this.requestWakeLock();
    },

    beforeUnmount() {
        clearInterval(this.interval);
        this.stopSound();
        this.releaseWakeLock();
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
                this.stopSound();
                clearInterval(this.interval);
                this.continueGame();
            }
        },

        continueGame() {
            this.$router.replace({name: 'game-results'});
        },

        playSound() {
            if (this.settings.sounds && sound.paused) {
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

<style scoped>
.play__header {
    padding: 28px 24px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
}

.play__heading {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.play__title {
    font-size: 30px;
    line-height: 1.05;
    font-stretch: 115%;
    letter-spacing: 0;
    overflow-wrap: anywhere;
}

.play__timer {
    position: relative;
    flex: none;
    width: 120px;
    height: 120px;
}

.play__timer-text {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.play__seconds {
    font-size: 46px;
    font-stretch: 115%;
    letter-spacing: 0;
}

.play__sec {
    font-size: 12px;
    font-weight: 700;
}

.play__words {
    margin: 0;
    list-style: none;
    gap: 10px;
}

.play__word {
    flex: 1 1 0;
    min-height: 64px;
    max-height: 104px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    gap: 16px;
}

.play__word-number {
    flex: none;
    width: 36px;
    height: 36px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 900;
}

.play__word-text {
    font-size: 27px;
    line-height: 1.15;
    font-weight: 750;
    font-stretch: 105%;
}

.play__donts {
    padding: 16px 24px 28px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
}

.play__dont {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    font-weight: 600;
}
</style>
