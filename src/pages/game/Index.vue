<template>
    <div class="page">
        <page-header home settings/>

        <div class="px-4">
            <v-sheet class="pass-on" color="primary-container" rounded="xxl">
                <blob-badge :size="200" class="pass-on__decoration" color="primary" shape="scallop"/>
                <span class="pass-on__label">{{ $t('game.pass-on') }}</span>
                <span class="pass-on__name font-display">{{ playerInTurn.name }}</span>
                <v-chip class="pass-on__team" color="primary" rounded="lg" size="small" variant="flat">
                    {{ $t('game.team-up', {team: teamInTurn.name}) }}
                </v-chip>
            </v-sheet>
        </div>

        <div class="scoreboard__header">
            <h2 class="scoreboard__title font-headline">{{ $t('game.scoreboard') }}</h2>
            <v-chip color="tertiary-container" rounded="lg" size="small" variant="flat">
                {{ $t('game.first-to', {points: settings.pointsNeededToWin}) }}
            </v-chip>
        </div>

        <div class="page__body scoreboard">
            <v-sheet
                v-for="(team, index) in teamSet"
                :key="team.id"
                class="scoreboard__team"
                color="surface-container-low"
                rounded="xl"
            >
                <div class="scoreboard__row">
                    <team-badge :index="index" :size="40" :team="team"/>
                    <div class="scoreboard__info">
                        <span class="scoreboard__name">{{ team.name }}</span>
                        <span class="scoreboard__players on-surface-variant">{{ playerNames(team) }}</span>
                    </div>
                    <span class="scoreboard__score font-display">{{ score[team.id] || 0 }}</span>
                </div>
                <v-progress-linear
                    :color="teamColors(index).accent"
                    :model-value="progress(team)"
                    bg-color="surface-container-highest"
                    bg-opacity="1"
                    height="10"
                    rounded
                />
            </v-sheet>
        </div>

        <div class="page__footer">
            <v-btn append-icon="mdi-play" block height="64" size="x-large" @click="continueGame">
                {{ $t('game.continue') }}
            </v-btn>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import BlobBadge from '@/components/BlobBadge.vue';
import PageHeader from '@/components/PageHeader.vue';
import TeamBadge from '@/components/game/TeamBadge.vue';
import {teamColors} from '@/services/team';

export default {
    components: {
        BlobBadge,
        PageHeader,
        TeamBadge,
    },

    computed: {
        ...mapState([
            'players',
            'score',
            'settings',
        ]),

        ...mapGetters([
            'teamSet',
            'teamInTurn',
            'playerInTurn',
        ]),
    },

    methods: {
        teamColors,

        playerNames(team) {
            return team.players.map((id) => this.players[id].name).join(', ');
        },

        progress(team) {
            return Math.min(100, (this.score[team.id] || 0) / this.settings.pointsNeededToWin * 100);
        },

        continueGame() {
            this.$router.replace({name: 'game-ready'});
        },
    },
};
</script>

<style scoped>
.pass-on {
    position: relative;
    overflow: hidden;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.pass-on__decoration {
    position: absolute;
    right: -56px;
    top: -48px;
    opacity: 0.14;
    pointer-events: none;
}

.pass-on__label {
    position: relative;
    font-size: 16px;
    font-weight: 600;
}

.pass-on__name {
    position: relative;
    font-size: 64px;
    font-stretch: 120%;
    letter-spacing: -1.5px;
    overflow-wrap: anywhere;
}

.pass-on__team {
    position: relative;
    align-self: flex-start;
    margin-top: 10px;
    font-weight: 700;
}

.scoreboard__header {
    padding: 28px 24px 12px;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}

.scoreboard__title {
    margin: 0;
    font-size: 22px;
}

.scoreboard {
    gap: 10px;
}

.scoreboard__team {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.scoreboard__row {
    display: flex;
    align-items: center;
    gap: 12px;
}

.scoreboard__info {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
}

.scoreboard__name {
    font-size: 17px;
    font-weight: 700;
}

.scoreboard__players {
    font-size: 13px;
}

.scoreboard__score {
    font-size: 32px;
    font-stretch: 115%;
    letter-spacing: 0;
}
</style>
