<template>
    <div>
        <md-list>
            <md-list-item>
                <span>{{ $t('game.time-over') }}</span>
            </md-list-item>
        </md-list>

        <md-button class="md-raised md-primary" @click="continueGame()">
            {{ $t('game.continue') }}
            <md-icon>play_arrow</md-icon>
        </md-button>
    </div>
</template>

<script>
    export default {
        methods: {
            continueGame() {
                this.$router.replace({name: 'game-results'});
            }
        }
    }
</script>
