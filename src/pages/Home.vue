<template>
    <div class="page home">
        <v-dialog v-model="confirmDialogOpen">
            <v-card
                class="mx-auto"
                max-width="600"
                rounded="xxl"
                :title="$t('home.dialog.title')"
            >
                <v-card-text>
                    {{ $t('home.dialog.content') }}
                </v-card-text>

                <v-divider/>

                <v-card-actions class="justify-center px-6 py-3">
                    <v-btn
                        class="flex-grow-1"
                        variant="outlined"
                        @click="cancelStartNewGame"
                    >
                        {{ $t('home.dialog.cancel') }}
                    </v-btn>

                    <v-btn
                        class="flex-grow-1"
                        @click="confirmStartNewGame"
                    >
                        {{ $t('home.dialog.ok') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <div class="home__glow" aria-hidden="true"></div>

        <page-header settings/>

        <div class="home__hero">
            <app-logo :size="168"/>
            <h1 class="home__title font-display text-primary">
                Guess <span class="text-secondary-container">’em</span> all
            </h1>
            <p class="home__tagline on-surface-variant">{{ $t('home.tagline') }}</p>
        </div>

        <v-spacer/>

        <div class="home__actions">
            <v-sheet v-if="gameInProgress" class="home__progress" color="surface-container" rounded="xxl">
                <div class="d-flex justify-space-between align-center">
                    <span class="text-section-label on-surface-variant">{{ $t('home.in-progress') }}</span>
                    <v-chip color="tertiary-container" rounded="lg" size="small" variant="flat">
                        {{ $t('game.first-to', {points: settings.pointsNeededToWin}) }}
                    </v-chip>
                </div>
                <div class="home__scores">
                    <template v-for="(team, index) in teamSet" :key="team.id">
                        <span v-if="index > 0" class="home__vs on-surface-variant">{{ $t('home.vs') }}</span>
                        <div class="home__score" :class="{'home__score--end': index % 2 === 1}">
                            <span class="home__score-team">{{ team.name }}</span>
                            <span class="home__score-points font-display" :class="`text-${teamColors(index).text}`">
                                {{ score[team.id] || 0 }}
                            </span>
                        </div>
                    </template>
                </div>
            </v-sheet>

            <v-btn
                v-if="gameInProgress"
                block
                height="64"
                prepend-icon="mdi-play"
                size="x-large"
                @click="continueGame"
            >
                {{ $t('home.continue') }}
            </v-btn>

            <div class="home__secondary">
                <v-btn color="secondary-container" height="56" prepend-icon="mdi-plus" size="large" @click="startNewGame">
                    {{ $t('home.new') }}
                </v-btn>
                <v-btn :to="{name: 'rules'}" height="56" prepend-icon="mdi-book-open-variant" size="large" variant="outlined">
                    {{ $t('home.rules') }}
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import AppLogo from '@/components/AppLogo.vue';
import PageHeader from '@/components/PageHeader.vue';
import {teamColors} from '@/services/team';

export default {
    components: {
        AppLogo,
        PageHeader,
    },

    data() {
        return {
            confirmDialogOpen: false,
        };
    },

    computed: {
        ...mapGetters([
            'gameInProgress',
            'teamSet',
        ]),

        ...mapState([
            'gameState',
            'score',
            'settings',
        ]),
    },

    methods: {
        teamColors,

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

<style scoped>
.home {
    overflow: hidden;
}

.home__glow {
    position: absolute;
    width: 520px;
    height: 520px;
    left: -65px;
    top: -230px;
    border-radius: 50%;
    background: rgb(var(--v-theme-primary-container));
    opacity: 0.55;
    pointer-events: none;
}

.home__hero {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 8px 24px 0;
    text-align: center;
}

.home__title {
    margin: 0;
    font-size: 46px;
    letter-spacing: -1px;
}

.home__tagline {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
}

.home__actions {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 24px 20px 28px;
}

.home__progress {
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.home__scores {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
}

.home__score {
    flex: 1 1 35%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.home__score--end {
    align-items: flex-end;
    text-align: right;
}

.home__score-team {
    font-size: 15px;
    font-weight: 600;
}

.home__score-points {
    font-size: 34px;
    font-stretch: 115%;
    letter-spacing: 0;
}

.home__vs {
    font-size: 15px;
    font-weight: 600;
}

.home__secondary {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
}
</style>
