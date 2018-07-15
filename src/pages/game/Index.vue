<template>
    <div>
        <md-list>
            <md-list-item>
                <span class="md-list-item-text">{{ $t('game.pass-on', {player: playerInTurn.name}) }}</span>
            </md-list-item>

            <md-list-item v-for="(team, index) in teamSet" :key="index">
                <md-icon>group</md-icon>
                <span class="md-list-item-text">{{ team.name }}: {{ $tc('game.score', score[team.id] || 0, {score: score[team.id] || 0}) }}</span>
            </md-list-item>
        </md-list>

        <md-button class="md-raised md-primary" @click="continueGame()">
            {{ $t('game.continue') }}
            <md-icon>play_arrow</md-icon>
        </md-button>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapState([
                'score'
            ]),

            ...mapGetters([
                'teamSet',
                'playerInTurn'
            ])
        },

        methods: {
            continueGame() {
                this.$router.replace({name: 'game-ready'});
            }
        }
    }
</script>
