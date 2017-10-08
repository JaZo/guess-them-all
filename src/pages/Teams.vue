<template>
    <div class="new">
        <md-list>
            <md-list-item v-for="(team, index) in teamSet" :key="index">
                <md-icon>group</md-icon>
                <span>{{ team.name }} ({{ team.players.length }} players)</span>
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
            Start new game
            <md-icon>play_arrow</md-icon>
        </md-button>
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
                this.$router.push({name: 'team', params: {id}});
            },
            start() {
                this.$store.dispatch('startGame').then(() => {
                    this.$router.push({name: 'game-index'});
                });
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
