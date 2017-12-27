<template>
    <div>
        <md-list>
            <md-list-item>
                <span>{{ $t('teams.intro') }}</span>
            </md-list-item>

            <md-list-item v-for="(team, index) in teamSet" :key="index">
                <md-icon>group</md-icon>
                <span @click="editTeam({id: team.id})">{{ team.name }} ({{ $tc('teams.players', team.players.length, {count: team.players.length}) }})</span>
                <md-button class="md-icon-button md-list-action" @click="editTeam({id: team.id})">
                    <md-icon class="md-primary">edit</md-icon>
                </md-button>
                <md-button class="md-icon-button md-list-action" @click="deleteTeam({id: team.id})">
                    <md-icon class="md-warn">remove_circle</md-icon>
                </md-button>
            </md-list-item>

            <md-list-item>
                <span></span>
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
