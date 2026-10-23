<template>
    <div class="page results">
        <div class="results__hero bg-secondary-container">
            <v-icon class="results__hero-icon" icon="mdi-timer-outline" size="190"/>
            <h1 class="results__title font-display">{{ $t('game.time-over') }}</h1>
            <p class="results__question">{{ $t('game.choose-entities') }}</p>
        </div>

        <v-form class="page__body results__words">
            <label
                v-for="(entity, index) in entities"
                :key="index"
                :class="guessedEntities[index] ? 'bg-primary-container' : 'bg-surface-container-low'"
                class="results__word"
            >
                <input v-model="guessedEntities[index]" class="d-sr-only" type="checkbox">
                <check-mark :model-value="guessedEntities[index]" :size="26"/>
                <span class="results__word-text">{{ entity }}</span>
            </label>
        </v-form>

        <div class="page__footer results__footer">
            <div class="results__points on-surface-variant">
                <span class="results__points-value font-display text-primary">+{{ score }}</span>
                {{ $t('game.points-for', {team: teamInTurn.name}) }}
            </div>
            <v-btn append-icon="mdi-play" block height="64" size="x-large" @click="continueGame">
                {{ $t('game.continue') }}
            </v-btn>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import CheckMark from '@/components/CheckMark.vue';
import mp3 from '../../assets/sounds/ringing.mp3';

const sound = new Audio(mp3);

export default {
    components: {
        CheckMark,
    },

    data() {
        return {
            guessedEntities: this.$store.state.entities.reduce((acc, cur, i) => {
                acc[i] = false;

                return acc;
            }, {}),
        };
    },

    computed: {
        ...mapState([
            'entities',
            'settings',
        ]),

        ...mapGetters([
            'teamInTurn',
        ]),

        score() {
            return Object.values(this.guessedEntities).filter(value => value).length;
        },
    },

    mounted() {
        this.playSound();
    },

    methods: {
        continueGame() {
            this.$store.dispatch('endRound', {score: this.score}).then(() => {
                if (this.$store.state.winner !== null) {
                    this.$router.replace({name: 'game-game-over'});
                } else {
                    this.$router.replace({name: 'game-index'});
                }
            });
        },

        playSound() {
            if (this.settings.sounds) {
                sound.play();
            }
        },
    },
};
</script>

<style scoped>
.results__hero {
    position: relative;
    overflow: hidden;
    border-radius: 0 0 40px 40px;
    padding: 56px 24px 28px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.results__hero-icon {
    position: absolute;
    right: -36px;
    top: -18px;
    opacity: 0.16;
}

.results__title {
    position: relative;
    margin: 0;
    font-size: 56px;
    font-stretch: 120%;
    letter-spacing: -1.5px;
}

.results__question {
    position: relative;
    margin: 0;
    font-size: 17px;
    font-weight: 600;
}

.results__words {
    padding-top: 20px;
    gap: 8px;
}

.results__word {
    min-height: 64px;
    border-radius: 20px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    transition: background-color 0.15s;
}

.results__word-text {
    flex: 1 1 auto;
    font-size: 20px;
    font-weight: 700;
}

.results__footer {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.results__points {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 600;
}

.results__points-value {
    font-size: 22px;
    letter-spacing: 0;
}
</style>
