<template>
    <div>
        <div class="main-content md-subheading">{{ $t('game.time-over') }}</div>

        <md-button class="md-raised md-primary" @click="continueGame()">
            {{ $t('game.continue') }}
            <md-icon>play_arrow</md-icon>
        </md-button>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    const sound = new Audio(require('../../assets/sounds/ringing.mp3'));

    export default {
        computed: mapState([
            'settings'
        ]),

        mounted() {
            this.playSound();
        },

        methods: {
            continueGame() {
                this.$router.replace({name: 'game-results'});
            },

            playSound() {
                if (this.settings.sounds) {
                    sound.play();
                }
            }
        }
    }
</script>
