<template>
    <div>
        <div class="main-content md-subheading">{{ $t('game.winner', {team: winningTeam.name}) }}</div>

        <md-button class="md-raised md-primary" @click="continueGame()">
            {{ $t('game.continue') }}
            <md-icon>play_arrow</md-icon>
        </md-button>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: mapGetters(['winningTeam']),

        methods: {
            continueGame() {
                this.$store.dispatch('endGame').then(() => {
                    this.$router.replace({name: 'teams'});
                });
            }
        }
    }
</script>
