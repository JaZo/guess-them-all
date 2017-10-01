<template>
    <div class="new">
        <md-list>
            <md-list-item>
                <span>Time over!</span>
            </md-list-item>
        </md-list>

        <md-button class="md-raised md-primary" @click="continueGame()">
            Continue
            <md-icon>play_arrow</md-icon>
        </md-button>
    </div>
</template>

<script>
    export default {
        methods: {
            continueGame() {
                this.$router.push({name: 'game-results'});
            }
        }
    }
</script>
