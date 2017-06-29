<template>
    <div class="new">
        <md-list>
            <md-list-item v-for="(team, index) in teamSet" :key="index">
                <md-icon>group</md-icon>
                <span>{{ team.name }} ({{ team.players.length }} players)</span>
                <md-button class="md-icon-button md-list-action" @click.native="editTeam({id: team.id})">
                    <md-icon class="md-primary">edit</md-icon>
                </md-button>
                <md-button class="md-icon-button md-list-action" @click.native="deleteTeam({id: team.id})">
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
    import { mapMutations, mapGetters } from 'vuex';

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
            ...mapGetters([
                'teamSet',
                'readyToStart'
            ])
        }
    }
</script>
