<template>
    <div>
        <md-list>
            <md-list-item>
                <span>{{ $t('game.choose-entities') }}</span>
            </md-list-item>

            <md-list-item v-for="(entity, index) in entities" :key="index">
                <md-checkbox v-model="guessedEntities[index]" class="md-primary">{{ entity }}</md-checkbox>
            </md-list-item>
        </md-list>

        <md-button class="md-raised md-primary" @click="continueGame()">
            {{ $t('game.continue') }}
            <md-icon>play_arrow</md-icon>
        </md-button>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                guessedEntities: this.$store.state.entities.reduce((acc, cur, i) => {
                    acc[i] = false;

                    return acc;
                }, {})
            }
        },

        computed: {
            ...mapState([
                'entities'
            ]),

            score() {
                return Object.values(this.guessedEntities).filter(value => value).length;
            }
        },

        methods: {
            continueGame() {
                this.$store.dispatch('endRound', {score: this.score}).then(() => {
                    if (this.$store.state.winner !== null) {
                        this.$router.replace({name: 'game-game-over'});
                    } else {
                        this.$router.replace({name: 'game-index'});
                    }
                });
            }
        }
    }
</script>
