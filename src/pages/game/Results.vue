<template>
    <v-container>
        <v-row align="center" justify="start">
            {{ $t('game.choose-entities') }}
        </v-row>

        <v-row align="center" justify="stretch">
            <v-sheet class="pa-6" width="100%">
                <v-form>
                    <v-checkbox v-for="(entity, index) in entities" :key="index" v-model="guessedEntities[index]"
                                :label="entity"/>
                </v-form>
            </v-sheet>
        </v-row>

        <v-row align="center" justify="start">
            <v-btn append-icon="mdi-play" color="primary" @click="continueGame()">
                {{ $t('game.continue') }}
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
import {mapState} from 'vuex';

export default {
    data() {
        return {
            guessedEntities: this.$store.state.entities.reduce((acc, cur, i) => {
                acc[i] = false;

                return acc;
            }, {}),
        };
    },

    computed: {
        ...mapState([
            'entities',
        ]),

        score() {
            return Object.values(this.guessedEntities).filter(value => value).length;
        },
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
        },
    },
};
</script>
