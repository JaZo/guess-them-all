<template>
    <div class="page winner">
        <span
            v-for="(bit, index) in confetti"
            :key="index"
            :style="bit"
            aria-hidden="true"
            class="winner__confetti"
        ></span>

        <div class="winner__explosion">
            <ConfettiExplosion :colors="confettiColors" :stageHeight="confettiHeight" :stageWidth="confettiWidth"/>
        </div>

        <page-header home/>

        <div class="winner__hero">
            <blob-badge :size="168" color="tertiary-container" shape="scallop">
                <v-icon class="on-tertiary-container" icon="mdi-trophy-outline" size="84"/>
            </blob-badge>
            <h1 class="winner__title">
                <span class="winner__team font-display text-primary">{{ winningTeam.name }}</span>
                <span class="winner__won font-headline">{{ $t('game.won') }}</span>
            </h1>
        </div>

        <div class="page__body winner__ranking">
            <div
                v-for="(team, index) in ranking"
                :key="team.id"
                :class="index === 0 ? 'bg-primary-container' : 'bg-surface-container-low'"
                class="winner__row"
            >
                <span class="winner__rank">{{ index + 1 }}</span>
                <span class="winner__name">{{ team.name }}</span>
                <span class="winner__score">
                    {{ $t('game.score', {score: score[team.id] || 0}, score[team.id] || 0) }}
                </span>
            </div>
        </div>

        <div class="page__footer winner__actions">
            <v-btn height="56" size="large" variant="outlined" @click="home">
                {{ $t('game.home') }}
            </v-btn>
            <v-btn height="56" size="large" @click="startNewGame">
                {{ $t('game.start-new') }}
            </v-btn>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import ConfettiExplosion from 'vue-confetti-explosion';
import BlobBadge from '@/components/BlobBadge.vue';
import PageHeader from '@/components/PageHeader.vue';
import mp3 from '../../assets/sounds/game-over.mp3';

const sound = new Audio(mp3);

// Static confetti bits: [x, y, color index]
const CONFETTI = [
    [34, 90, 0], [86, 150, 1], [300, 84, 2], [338, 170, 3], [64, 236, 2], [318, 262, 0], [20, 330, 1],
    [352, 350, 2], [110, 60, 3], [250, 52, 1], [200, 110, 2], [150, 300, 0], [40, 170, 0], [270, 180, 3],
];
const CONFETTI_COLORS = [
    'rgb(var(--v-theme-primary))',
    '#fa7627',
    '#f4c430',
    'rgb(var(--v-theme-primary-container))',
];

export default {
    components: {
        BlobBadge,
        ConfettiExplosion,
        PageHeader,
    },

    computed: {
        ...mapState([
            'settings',
            'score',
        ]),

        ...mapGetters([
            'teamSet',
            'winningTeam',
        ]),

        ranking() {
            return this.teamSet.slice().sort((a, b) => (this.score[b.id] || 0) - (this.score[a.id] || 0));
        },

        confetti() {
            return CONFETTI.map(([x, y, color], index) => {
                const round = index % 3 === 0;

                return {
                    left: `${x}px`,
                    top: `${y}px`,
                    width: round ? '10px' : '14px',
                    height: round ? '10px' : '6px',
                    borderRadius: round ? '50%' : '3px',
                    background: CONFETTI_COLORS[color],
                    transform: `rotate(${(index * 37) % 180}deg)`,
                };
            });
        },

        confettiHeight() {
            return window.innerHeight;
        },

        confettiWidth() {
            return window.innerWidth * 1.25;
        },

        confettiColors() {
            return CONFETTI_COLORS;
        },
    },

    mounted() {
        this.playSound();
    },

    methods: {
        home() {
            this.$store.dispatch('endGame').then(() => {
                this.$router.replace({name: 'home'});
            });
        },

        startNewGame() {
            this.$store.dispatch('endGame').then(() => {
                this.$router.replace({name: 'teams'});
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
.winner {
    overflow: hidden;
}

.winner__confetti {
    position: absolute;
    pointer-events: none;
}

.winner__explosion {
    position: absolute;
    top: 0;
    left: 50%;
    pointer-events: none;
}

.winner__hero {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    padding: 12px 24px 0;
}

.winner__title {
    margin: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.winner__team {
    font-size: 52px;
    font-stretch: 120%;
    letter-spacing: -1.5px;
    overflow-wrap: anywhere;
}

.winner__won {
    font-size: 34px;
    font-stretch: 112%;
    line-height: 1.1;
}

.winner__ranking {
    position: relative;
    padding-top: 24px;
    gap: 8px;
}

.winner__row {
    min-height: 60px;
    border-radius: 20px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    gap: 14px;
}

.winner__rank {
    width: 28px;
    font-size: 20px;
    font-weight: 900;
}

.winner__name {
    flex: 1 1 auto;
    min-width: 0;
    font-size: 17px;
    font-weight: 700;
}

.winner__score {
    font-size: 15px;
    font-weight: 600;
}

.winner__actions {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
}
</style>
