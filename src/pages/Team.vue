<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col>
                    {{ $t('teams.intro') }}
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-text-field v-model="name" :label="$t('teams.team-name')"/>
                </v-col>
            </v-row>

            <v-row v-for="(player, index) in players" :key="index">
                <v-col>
                    <player
                        ref="players"
                        :data="player"
                        @update="updatePlayer({id: team.players[index], player: $event})"
                        @delete="deletePlayer({id: team.players[index]})"
                    />
                </v-col>
            </v-row>

            <v-row justify="end">
                <v-col cols="auto">
                    <v-btn color="primary" icon="mdi-account-plus" @click="createPlayer({teamId: id})"/>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
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
