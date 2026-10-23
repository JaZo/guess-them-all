<template>
    <div class="page">
        <page-header back/>

        <div class="page__intro">
            <h1 class="text-page-title">{{ $t('teams.title') }}</h1>
            <p class="text-intro on-surface-variant">{{ $t('teams.intro') }}</p>
        </div>

        <div class="page__body">
            <v-card
                v-for="(team, index) in teamSet"
                :key="team.id"
                :color="teamColors(index).container"
                class="team-card"
                link
                rounded="xxl"
                variant="flat"
                @click="editTeam({id: team.id})"
            >
                <team-badge :index="index" :size="52" :team="team" inverted/>

                <div class="team-card__body">
                    <div class="team-card__heading">
                        <span class="team-card__name font-headline">{{ team.name }}</span>
                        <span class="team-card__count">
                            {{ $tc('teams.players', team.players.length, {count: team.players.length}) }}
                        </span>
                    </div>
                    <div class="team-card__players">
                        <v-chip
                            v-for="playerId in team.players"
                            :key="playerId"
                            color="surface-container-lowest"
                            rounded="lg"
                            size="small"
                            variant="flat"
                        >
                            {{ players[playerId].name }}
                        </v-chip>
                    </div>
                </div>

                <v-icon icon="mdi-chevron-right"/>
            </v-card>

            <v-btn
                class="teams__add"
                height="64"
                prepend-icon="mdi-plus"
                rounded="xxl"
                size="large"
                variant="outlined"
                @click="createTeam"
            >
                {{ $t('teams.add') }}
            </v-btn>
        </div>

        <div class="page__footer">
            <v-btn
                :disabled="!readyToStart"
                block
                height="64"
                prepend-icon="mdi-play"
                size="x-large"
                @click="start"
            >
                {{ $t('teams.start') }}
            </v-btn>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex';
import PageHeader from '@/components/PageHeader.vue';
import TeamBadge from '@/components/game/TeamBadge.vue';
import {teamColors} from '@/services/team';

export default {
    components: {
        PageHeader,
        TeamBadge,
    },

    computed: {
        ...mapGetters([
            'teamSet',
            'readyToStart',
        ]),

        ...mapState([
            'players',
        ]),
    },

    methods: {
        ...mapMutations([
            'createTeam',
        ]),

        teamColors,

        editTeam({id}) {
            this.$router.push({name: 'team', params: {id}});
        },

        start() {
            this.$store.dispatch('startGame').then(() => {
                this.$router.replace({name: 'game-index'});
            });
        },
    },
};
</script>

<style scoped>
.team-card {
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 14px;
    text-align: left;
}

.team-card__body {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.team-card__heading {
    display: flex;
    align-items: baseline;
    gap: 8px;
}

.team-card__name {
    font-size: 20px;
}

.team-card__count {
    font-size: 13px;
    font-weight: 600;
    opacity: 0.8;
}

.team-card__players {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.team-card__players .v-chip {
    font-weight: 600;
}

.teams__add {
    border: 2px dashed rgb(var(--v-theme-outline-variant));
}
</style>
