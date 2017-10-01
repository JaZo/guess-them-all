<template>
    <div class="new">
        <md-list>
            <md-list-item>
                <span>Team: {{ teamInTurn.name }} | Player: {{ playerInTurn.name }} | Ready?</span>
            </md-list-item>
        </md-list>

        <md-button class="md-raised md-primary" @click="continueGame()">
            Continue
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
                    this.$router.push({name: 'game-game'});
                });
            }
        },
        computed: mapGetters([
            'teamInTurn',
            'playerInTurn'
        ])
    }
</script>
