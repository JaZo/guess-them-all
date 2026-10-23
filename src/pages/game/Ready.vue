<template>
    <div class="page-bleed bg-hero">
        <div class="page ready">
            <svg class="ready__sparkle ready__sparkle--1" viewBox="0 0 24 24" aria-hidden="true"><path :d="sparkle" fill="#f4c430"/></svg>
            <svg class="ready__sparkle ready__sparkle--2" viewBox="0 0 24 24" aria-hidden="true"><path :d="sparkle" fill="#fa7627"/></svg>
            <svg class="ready__sparkle ready__sparkle--3" viewBox="0 0 24 24" aria-hidden="true"><path :d="sparkle" fill="#f4c430"/></svg>

            <page-header :back-to="{name: 'game-index'}" back color="on-hero"/>

            <div class="ready__text">
                <span class="ready__name font-display">{{ $t('game.ready-name', {player: playerInTurn.name}) }}</span>
                <span class="ready__question font-headline">{{ $t('game.ready-question') }}</span>
                <div class="ready__facts">
                    <v-chip class="ready__chip" prepend-icon="mdi-timer-outline" rounded="lg" variant="outlined">
                        {{ $t('game.seconds', {seconds: settings.timeLimit}) }}
                    </v-chip>
                    <v-chip class="ready__chip" prepend-icon="mdi-message-outline" rounded="lg" variant="outlined">
                        {{ $t('game.words', {count: settings.numberOfEntitiesPerRound}) }}
                    </v-chip>
                </div>
            </div>

            <div class="ready__action">
                <button class="ready__button" type="button" @click="continueGame">
                    <blob-badge :size="220" color="secondary-container" shape="scallop">
                        <span class="ready__button-content on-secondary-container">
                            <v-icon icon="mdi-play" size="72"/>
                            <span class="ready__button-label">{{ $t('game.continue') }}</span>
                        </span>
                    </blob-badge>
                </button>
            </div>

            <div class="ready__spacer"></div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import BlobBadge from '@/components/BlobBadge.vue';
import PageHeader from '@/components/PageHeader.vue';

const SPARKLE = 'M12 1Q13.2 10.8 23 12Q13.2 13.2 12 23Q10.8 13.2 1 12Q10.8 10.8 12 1Z';

export default {
    components: {
        BlobBadge,
        PageHeader,
    },

    computed: {
        ...mapState([
            'settings',
        ]),

        ...mapGetters([
            'teamInTurn',
            'playerInTurn',
        ]),

        sparkle() {
            return SPARKLE;
        },
    },

    methods: {
        continueGame() {
            this.$store.dispatch('startRound').then(() => {
                this.$router.replace({name: 'game-game'});
            });
        },
    },
};
</script>

<style scoped>
.ready {
    overflow: hidden;
}

.ready__sparkle {
    position: absolute;
    pointer-events: none;
}

.ready__sparkle--1 {
    width: 30px;
    height: 30px;
    left: 44px;
    top: 150px;
}

.ready__sparkle--2 {
    width: 18px;
    height: 18px;
    right: 52px;
    top: 118px;
}

.ready__sparkle--3 {
    width: 22px;
    height: 22px;
    right: 40px;
    top: 470px;
}

.ready__text {
    position: relative;
    padding: 72px 28px 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.ready__name {
    font-size: 76px;
    line-height: 0.95;
    font-stretch: 122%;
    letter-spacing: -2px;
    overflow-wrap: anywhere;
}

.ready__question {
    font-size: 38px;
    font-stretch: 112%;
    line-height: 1.1;
}

.ready__facts {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 20px;
}

.ready__chip {
    height: 36px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(var(--v-theme-on-hero));
    border-color: rgb(var(--v-theme-hero-outline));
}

.ready__action {
    position: relative;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.ready__button {
    border: 0;
    padding: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
    border-radius: 50%;
}

.ready__button-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
}

.ready__button-label {
    font-size: 18px;
    font-weight: 800;
}

.ready__spacer {
    height: 56px;
}
</style>
