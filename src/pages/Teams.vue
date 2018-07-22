<template>
    <div>
        <div class="main-content md-subheading">{{ $t('teams.intro') }}</div>

        <md-list>
            <md-list-item v-for="(team, index) in teamSet" :key="index">
                <md-icon>group</md-icon>
                <span class="md-list-item-text no-select" @click="editTeam({id: team.id})">{{ team.name }} ({{ $tc('teams.players', team.players.length, {count: team.players.length}) }})</span>
                <md-button class="md-icon-button md-list-action" @click="editTeam({id: team.id})">
                    <md-icon class="md-primary">edit</md-icon>
                </md-button>
                <md-button class="md-icon-button md-list-action" @click="deleteTeam({id: team.id})">
                    <md-icon class="md-accent">remove_circle</md-icon>
                </md-button>
            </md-list-item>

            <md-list-item>
                <span class="md-list-item-text"/>
                <md-button class="md-icon-button md-list-action" @click="createTeam()">
                    <md-icon class="md-primary">group_add</md-icon>
                </md-button>
            </md-list-item>
        </md-list>

        <md-button class="md-raised md-primary" :disabled="!readyToStart" @click="start()">
            {{ $t('teams.start') }}
            <md-icon>play_arrow</md-icon>
        </md-button>
    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'teamSet',
                'readyToStart'
            ])
        },

        methods: {
            ...mapMutations([
                'createTeam',
                'deleteTeam'
            ]),

            editTeam({id}) {
                this.$router.push({name: 'team', params: {id}});
            },

            start() {
                this.$store.dispatch('startGame').then(() => {
                    this.$router.replace({name: 'game-index'});
                });
            }
        }
    }
</script>

<style>
    .no-select {
        user-select: none;
    }
</style>
