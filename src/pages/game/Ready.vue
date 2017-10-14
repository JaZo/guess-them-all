<template>
    <div class="new">
        <md-list>
            <md-list-item>
                <span>{{ $t('game.ready', {player: playerInTurn.name}) }}</span>
            </md-list-item>
        </md-list>

        <md-button class="md-raised md-primary" @click="continueGame()">
            {{ $t('game.continue') }}
            <md-icon>play_arrow</md-icon>
        </md-button>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        methods: {
            continueGame() {
                this.$store.dispatch('startRound').then(() => {
                    this.$router.replace({name: 'game-game'});
                });
            }
        },
        computed: mapGetters([
            'teamInTurn',
            'playerInTurn'
        ])
    }
</script>
