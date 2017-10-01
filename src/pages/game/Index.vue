<template>
    <div class="new">
        <md-list>
            <md-list-item>
                <span>Score</span>
            </md-list-item>
            <md-list-item v-for="(team, index) in teamSet" :key="index">
                <md-icon>group</md-icon>
                <span>{{ team.name }}: {{ 0 }} points</span>
            </md-list-item>
        </md-list>

        <md-button class="md-raised md-primary" @click="continueGame()">
            Continue
            <md-icon>play_arrow</md-icon>
        </md-button>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'

    export default {
        methods: {
            continueGame() {
                this.$router.push('/game/ready');
            }
        },
        computed: {
            ...mapState([]),
            ...mapGetters([
                'teamSet'
            ])
        }
    }
</script>
