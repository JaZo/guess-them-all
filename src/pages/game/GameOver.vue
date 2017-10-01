<template>
    <div class="new">
        <md-list>
            <md-list-item>
                <span>{{ winningTeam.name }} won!</span>
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
                this.$router.push('/game/new');
            }
        },
        computed: mapGetters(['winningTeam'])
    }
</script>
