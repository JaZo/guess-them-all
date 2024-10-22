<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-dialog v-model="confirmDialogOpen">
                <v-card
                    class="mx-auto"
                    max-width="600"
                    :title="$t('home.dialog.title')"
                >
                    <v-card-text>
                        {{ $t('home.dialog.content') }}
                    </v-card-text>

                    <v-divider/>

                    <v-card-actions class="justify-center px-6 py-3">
                        <v-btn
                            class="flex-grow-1 text-none"
                            color="primary"
                            variant="outlined"
                            @click="cancelStartNewGame"
                        >
                            {{ $t('home.dialog.cancel') }}
                        </v-btn>

                        <v-btn
                            class="text-white flex-grow-1 text-none"
                            color="primary"
                            variant="flat"
                            @click="confirmStartNewGame"
                        >
                            {{ $t('home.dialog.ok') }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-col cols="auto">
                <v-btn v-if="gameInProgress" color="primary" @click="continueGame">
                    {{ $t('home.continue') }}
                </v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn @click="startNewGame" color="primary">
                    {{ $t('home.new') }}
                </v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn :to="{name: 'rules'}" color="secondary">
                    {{ $t('home.rules') }}
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapGetters, mapState} from 'vuex';

export default {
    data() {
        return {
            confirmDialogOpen: false,
        };
    },

    computed: {
        ...mapGetters([
            'gameInProgress',
        ]),

        ...mapState([
            'gameState',
        ]),
    },

    methods: {
        continueGame() {
            this.$router.push({name: this.gameState});
        },

        startNewGame() {
            if (this.gameInProgress) {
                this.confirmDialogOpen = true;
            } else {
                this.$router.push({name: 'teams'});
            }
        },

        cancelStartNewGame() {
            this.confirmDialogOpen = false;
        },

        confirmStartNewGame() {
            this.$store.dispatch('stopGame').then(() => {
                this.$router.push({name: 'teams'});
            });
        },
    },
};
</script>
