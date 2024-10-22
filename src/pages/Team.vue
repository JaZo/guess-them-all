<template>
    <v-container>
        <v-row align="center" justify="start">
            {{ $t('teams.intro') }}
        </v-row>

        <v-row align="center" justify="start">
            <v-sheet class="pa-6" width="100%">
                <v-form>
                    <v-text-field v-model="name" :label="$t('teams.team-name')"/>

                    <player
                        v-for="(player, index) in players"
                        ref="players"
                        :key="index"
                        :data="player"
                        @update="updatePlayer({id: team.players[index], player: $event})"
                        @delete="deletePlayer({id: team.players[index]})"
                    />

                    <v-btn color="primary" icon="mdi-account-plus" @click="createPlayer({teamId: id})"/>
                </v-form>
            </v-sheet>
        </v-row>
    </v-container>
</template>

<script>
import {mapMutations} from 'vuex';
import Player from '@/components/game/Team/Player.vue';

export default {
    components: {
        player: Player,
    },

    computed: {
        id() {
            return this.$route.params.id;
        },

        team() {
            return this.$store.state.teams[this.id];
        },

        players() {
            return this.team.players.map((id) => {
                return this.$store.state.players[id];
            });
        },

        name: {
            get() {
                return this.team.name;
            },
            set(value) {
                this.$store.commit('updateTeam', {id: this.id, team: {name: value, players: this.team.players}});
            },
        },
    },

    methods: {
        ...mapMutations([
            'updatePlayer',
            'deletePlayer',
        ]),

        createPlayer(player) {
            this.$store.commit('createPlayer', player);
            this.$nextTick(() => {
                this.$refs.players[this.players.length - 1].focus();
            });
        },
    },
};
</script>
