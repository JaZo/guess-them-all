<template>
    <div class="team">
        <md-list>
            <md-list-item>
                <md-input-container>
                    <label>Team name</label>
                    <md-input v-model="name"></md-input>
                </md-input-container>
            </md-list-item>

            <player v-for="(player, playerId) in players"
                    :key="playerId"
                    :data="player"
                    @update="updatePlayer({id: playerId, player: $event})"
                    @delete="deletePlayer({id: playerId})"
            ></player>

            <md-list-item>
                <span></span>
                <md-button class="md-icon-button md-list-action" @click.native="createPlayer({teamId: id})">
                    <md-icon class="md-primary">person_add</md-icon>
                </md-button>
            </md-list-item>
        </md-list>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import Player from '@/components/game/Team/Player'

    export default {
        components: {
            'player': Player
        },
        computed: {
            id() {
                return this.$route.params.id;
            },
            team() {
                return this.$store.state.teams[this.id];
            },
            players() {
                return this.$store.getters.playersInTeam(this.id);
            },
            name: {
                get() {
                    return this.team.name;
                },
                set(value) {
                    this.$store.commit('updateTeam', {id: this.id, team: {name: value}});
                }
            }
        },
        methods: mapMutations([
            'createPlayer',
            'updatePlayer',
            'deletePlayer'
        ])
    }
</script>
