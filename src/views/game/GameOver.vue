<template>
    <div>
        <div class="main-content md-headline">
            {{ $t('game.winner', {team: winningTeam.name}) }}
        </div>

        <md-list>
            <md-list-item v-for="(team, index) in teamSet" :key="index">
                <md-icon>group</md-icon>
                <span class="md-list-item-text">{{ team.name }}: {{ $tc('game.score', score[team.id] || 0, {score: score[team.id] || 0}) }}</span>
            </md-list-item>
        </md-list>

        <md-button class="md-raised md-accent" @click="continueGame()">
            {{ $t('game.start-new') }}
            <md-icon>play_arrow</md-icon>
        </md-button>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapState([
            'score',
        ]),

        ...mapGetters([
            'teamSet',
            'playerInTurn',
            'winningTeam',
        ]),
    },

    methods: {
        continueGame () {
            this.$store.dispatch('endGame').then(() => {
                this.$router.replace({ name: 'teams' });
            });
        },
    },
};
</script>
