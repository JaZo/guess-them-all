<template>
    <div v-if="team" class="page">
        <page-header back/>

        <div class="page__intro">
            <h1 class="text-page-title">{{ team.name }}</h1>
        </div>

        <v-form class="page__body">
            <v-sheet class="team-form" color="surface-container-low" rounded="xl">
                <v-text-field v-model="name" :label="$t('teams.team-name')"/>

                <player
                    v-for="(player, index) in players"
                    :key="team.players[index]"
                    ref="players"
                    :data="player"
                    @update="updatePlayer({id: team.players[index], player: $event})"
                    @delete="deletePlayer({id: team.players[index]})"
                />
            </v-sheet>

            <v-btn
                class="team-form__add"
                height="64"
                prepend-icon="mdi-account-plus"
                rounded="xxl"
                size="large"
                variant="outlined"
                @click="createPlayer({teamId: id})"
            >
                {{ $t('teams.add-player') }}
            </v-btn>
        </v-form>

        <div class="page__footer team-form__actions">
            <v-btn color="error" height="56" size="large" variant="outlined" @click="removeTeam">
                {{ $t('teams.remove') }}
            </v-btn>
            <v-btn height="56" size="large" @click="$router.back()">
                {{ $t('teams.done') }}
            </v-btn>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex';
import PageHeader from '@/components/PageHeader.vue';
import Player from '@/components/game/Team/Player.vue';

export default {
    components: {
        PageHeader,
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
            'deleteTeam',
        ]),

        createPlayer(player) {
            this.$store.commit('createPlayer', player);
            this.$nextTick(() => {
                this.$refs.players[this.players.length - 1].focus();
            });
        },

        removeTeam() {
            const id = this.id;

            this.$router.replace({name: 'teams'}).then(() => {
                this.deleteTeam({id});
            });
        },
    },
};
</script>

<style scoped>
.team-form {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.team-form__add {
    border: 2px dashed rgb(var(--v-theme-outline-variant));
}

.team-form__actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
}
</style>
