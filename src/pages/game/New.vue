<template>
    <div class="new">
        <md-list>
            <md-list-item v-for="(team, id) in teams" :key="id">
                <md-icon>group</md-icon>
                <span>{{ team.name }} ({{ playersInTeamCount(id) }} players)</span>
                <md-button class="md-icon-button md-list-action" @click.native="editTeam({id})">
                    <md-icon class="md-primary">edit</md-icon>
                </md-button>
                <md-button class="md-icon-button md-list-action" @click.native="deleteTeam({id})">
                    <md-icon class="md-warn">remove_circle</md-icon>
                </md-button>
            </md-list-item>

            <md-list-item>
                <span></span>
                <md-button class="md-icon-button md-list-action" @click.native="createTeam()">
                    <md-icon class="md-primary">group_add</md-icon>
                </md-button>
            </md-list-item>
        </md-list>

        <a v-if="teamsReady" href="#" @click.prevent="start">Start new Game</a>
    </div>
</template>

<script>
    import { mapMutations, mapState, mapGetters } from 'vuex'

    export default {
        methods: {
            ...mapMutations([
                'createTeam',
                'deleteTeam'
            ]),
            editTeam({id}) {
                this.$router.push('/game/new/team/' + id);
            },
            start() {
                this.$store.dispatch('start');
                this.$router.push('/game/index');
            }
        },
        computed: {
            ...mapState([
                'teams',
                'players'
            ]),
            ...mapGetters([
                'playersInTeamCount',
                'teamsReady'
            ])
        }
    }
</script>
