<template>
    <v-container>
        <v-dialog v-model="chooseEntitiesDialogOpen">
            <v-card
                class="mx-auto"
                max-width="600"
                :title="$t('settings.dialog.title')"
            >
                <v-card-text>
                    {{ $t('settings.dialog.content') }}
                </v-card-text>

                <v-divider/>

                <v-card-actions class="justify-center px-6 py-3">
                    <v-btn
                        class="text-white flex-grow-1 text-none"
                        color="primary"
                        variant="flat"
                        @click="chooseEntitiesDialogOpen = false"
                    >
                        {{ $t('settings.dialog.ok') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-sheet class="pa-6">
            <v-form>
                <v-select
                    v-model="locale"
                    :items="locales"
                    :label="$t('settings.locale')"
                />

                <v-select
                    v-model="pointsNeededToWin"
                    :items="[15, 30, 45, 60]"
                    :label="$t('settings.points-needed-to-win')"
                />

                <v-select
                    v-model="numberOfEntitiesPerRound"
                    :items="[4, 5, 6]"
                    :label="$t('settings.number-of-entities-per-round')"
                />

                <v-select
                    v-model="entities"
                    multiple
                    :items="entityList"
                    :label="$t('settings.entities')"
                >
                    <template #item="{ props, item }">
                        <v-list-subheader v-if="props.header">
                            {{ props.header }}
                        </v-list-subheader>
                        <v-list-item v-else v-bind="props"></v-list-item>
                    </template>
                </v-select>

                <v-select
                    v-model="sounds"
                    :items="[{title: $t('settings.sounds-enabled'), value: true}, {title: $t('settings.sounds-disabled'), value: false}]"
                    :label="$t('settings.sounds')"
                />
            </v-form>
        </v-sheet>
    </v-container>
</template>

<script>
import {mapMutations, mapState} from 'vuex';
import entities from '../data/entities';

export default {
    beforeRouteLeave(to, from, next) {
        if (this.entities.length < 1) {
            this.chooseEntitiesDialogOpen = true;
            next(false);
        } else {
            next();
        }
    },

    data() {
        return {
            chooseEntitiesDialogOpen: false,
        };
    },

    computed: {
        ...mapState([
            'settings',
        ]),

        locales() {
            return this.$i18n.availableLocales.map((locale) => {
                return {
                    value: locale,
                    title: this.$t('language', locale),
                };
            });
        },

        locale: {
            get() {
                return this.$store.state.settings.locale;
            },
            set(value) {
                this.updateSettings(Object.assign({}, this.settings, {locale: value}));
            },
        },

        numberOfEntitiesPerRound: {
            get() {
                return this.$store.state.settings.numberOfEntitiesPerRound;
            },
            set(value) {
                this.updateSettings(Object.assign({}, this.settings, {numberOfEntitiesPerRound: value}));
            },
        },

        pointsNeededToWin: {
            get() {
                return this.$store.state.settings.pointsNeededToWin;
            },
            set(value) {
                this.updateSettings(Object.assign({}, this.settings, {pointsNeededToWin: value}));
            },
        },

        entities: {
            get() {
                return this.$store.state.settings.entities;
            },
            set(value) {
                this.updateSettings(Object.assign({}, this.settings, {entities: value}));
            },
        },

        sounds: {
            get() {
                return this.$store.state.settings.sounds;
            },
            set(value) {
                this.updateSettings(Object.assign({}, this.settings, {sounds: value}));
            },
        },

        entityList() {
            return Object.keys(entities).reduce((acc, language) => {
                acc.push({props: {header: this.$t('language', language)}});
                Object.keys(entities[language]).reduce((acc, key) => {
                    acc.push({title: entities[language][key].name, value: language + '.' + key});
                    return acc;
                }, acc);
                return acc;
            }, []);
        },
    },

    methods: mapMutations([
        'updateSettings',
    ]),
};
</script>
