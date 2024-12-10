<template>
    <v-container>
        <v-row>
            <v-col>
                {{ $t('game.winner', {team: winningTeam.name}) }}
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-list>
                    <v-list-item v-for="(team, index) in teamSet" :key="index">
                        <template #prepend>
                            <v-avatar color="grey-lighten-1">
                                <v-icon>mdi-account-multiple</v-icon>
                            </v-avatar>
                        </template>

                        <v-list-item-title>{{ team.name }}:
                            {{ $tc('game.score', score[team.id] || 0, {score: score[team.id] || 0}) }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-btn append-icon="mdi-play" color="primary" @click="continueGame()">
                    {{ $t('game.start-new') }}
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapState, mapGetters} from 'vuex';

export default {
    computed: {
        ...mapState([
            'score',
        ]),

        ...mapGetters([
            'teamSet',
            'playerInTurn',
            'winningTeam',
        ]),
    },

    methods: {
        continueGame() {
            this.$store.dispatch('endGame').then(() => {
                this.$router.replace({name: 'teams'});
            });
        },
    },
};
</script>
