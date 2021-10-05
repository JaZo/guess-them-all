<template>
    <div>
        <div class="main-content md-subheading">
            {{ $t('teams.intro') }}
        </div>

        <md-list>
            <md-list-item>
                <md-field>
                    <label>{{ $t('teams.team-name') }}</label>
                    <md-input v-model="name" />
                </md-field>
            </md-list-item>

            <player v-for="(player, index) in players"
                    ref="players"
                    :key="index"
                    :data="player"
                    @update="updatePlayer({id: team.players[index], player: $event})"
                    @delete="deletePlayer({id: team.players[index]})"
            />

            <md-list-item>
                <span class="md-list-item-text" />
                <md-button class="md-icon-button md-list-action" @click="createPlayer({teamId: id})">
                    <md-icon class="md-primary">
                        person_add
                    </md-icon>
                </md-button>
            </md-list-item>
        </md-list>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Player from '@/components/game/Team/Player';

export default {
    components: {
        player: Player,
    },

    computed: {
        id () {
            return this.$route.params.id;
        },

        team () {
            return this.$store.state.teams[this.id];
        },

        players () {
            return this.team.players.map((id) => {
                return this.$store.state.players[id];
            });
        },

        name: {
            get () {
                return this.team.name;
            },
            set (value) {
                this.$store.commit('updateTeam', { id: this.id, team: { name: value, players: this.team.players } });
            },
        },
    },

    methods: {
        ...mapMutations([
            'updatePlayer',
            'deletePlayer',
        ]),

        createPlayer (player) {
            this.$store.commit('createPlayer', player);
            this.$nextTick(() => {
                this.$refs.players[this.players.length - 1].focus();
            });
        },
    },
};
</script>
