<template>
    <v-container>
        <v-row align="center" justify="start">
            {{ $t('teams.intro') }}
        </v-row>

        <v-row align="center" justify="stretch">
            <v-sheet class="pa-6" width="100%">
                <v-list>
                    <v-list-item v-for="(team, index) in teamSet" :key="index" :value="index"
                                 @click="editTeam({id: team.id})">
                        <template #prepend>
                            <v-avatar color="grey-lighten-1">
                                <v-icon>mdi-account-multiple</v-icon>
                            </v-avatar>
                        </template>

                        <v-list-item-title>{{ team.name }}
                            ({{ $tc('teams.players', team.players.length, {count: team.players.length}) }})
                        </v-list-item-title>

                        <template #append>
                            <v-btn color="primary" icon="mdi-pencil" variant="text" @click="editTeam({id: team.id})"/>
                            <v-btn color="red-darken-2" icon="mdi-minus-circle" variant="text"
                                   @click="deleteTeam({id: team.id})"/>
                        </template>
                    </v-list-item>
                </v-list>

                <v-btn color="primary" icon="mdi-account-multiple-plus" @click="createTeam"/>
            </v-sheet>
        </v-row>

        <v-row align="center" justify="start">
            <v-btn :disabled="!readyToStart" append-icon="mdi-play" color="primary" @click="start">
                {{ $t('teams.start') }}
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'teamSet',
            'readyToStart',
        ]),
    },

    methods: {
        ...mapMutations([
            'createTeam',
            'deleteTeam',
        ]),

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
