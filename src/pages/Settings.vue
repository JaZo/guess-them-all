<template>
    <div class="page">
        <v-dialog v-model="chooseEntitiesDialogOpen">
            <v-card
                class="mx-auto"
                max-width="600"
                rounded="xxl"
                :title="$t('settings.dialog.title')"
            >
                <v-card-text>
                    {{ $t('settings.dialog.content') }}
                </v-card-text>

                <v-divider/>

                <v-card-actions class="justify-center px-6 py-3">
                    <v-btn
                        class="flex-grow-1"
                        @click="chooseEntitiesDialogOpen = false"
                    >
                        {{ $t('settings.dialog.ok') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <page-header back/>

        <div class="page__intro">
            <h1 class="text-page-title">{{ $t('settings.title') }}</h1>
        </div>

        <v-form class="page__body settings">
            <div class="settings__label text-section-label text-primary">{{ $t('settings.appearance') }}</div>
            <v-sheet color="surface-container-low" rounded="xl">
                <div class="settings__row">
                    <span class="settings__row-label">{{ $t('settings.theme') }}</span>
                    <v-btn-toggle
                        v-model="theme"
                        :aria-label="$t('settings.theme')"
                        border
                        class="settings__toggle"
                        :color="cssColor('on-surface')"
                        density="comfortable"
                        divided
                        mandatory
                        rounded="pill"
                        selected-class="bg-primary-container"
                        variant="text"
                    >
                        <v-btn v-for="item in themes" :key="item.value" :value="item.value">
                            {{ item.title }}
                        </v-btn>
                    </v-btn-toggle>
                </div>
                <v-divider class="settings__divider"/>
                <div class="settings__row">
                    <span class="settings__row-label">{{ $t('settings.locale') }}</span>
                    <v-btn-toggle
                        v-model="locale"
                        :aria-label="$t('settings.locale')"
                        border
                        class="settings__toggle"
                        :color="cssColor('on-surface')"
                        density="comfortable"
                        divided
                        mandatory
                        rounded="pill"
                        selected-class="bg-primary-container"
                        variant="text"
                    >
                        <v-btn v-for="item in locales" :key="item.value" :value="item.value">
                            {{ item.title }}
                        </v-btn>
                    </v-btn-toggle>
                </div>
            </v-sheet>

            <div class="settings__label settings__label--spaced text-section-label text-primary">{{ $t('settings.game') }}</div>
            <v-sheet color="surface-container-low" rounded="xl">
                <div class="settings__group">
                    <span class="settings__row-label">{{ $t('settings.points-needed-to-win') }}</span>
                    <div class="settings__choices" style="--columns: 4">
                        <v-btn
                            v-for="value in [15, 30, 45, 60]"
                            :key="value"
                            :aria-pressed="pointsNeededToWin === value"
                            :color="pointsNeededToWin === value ? 'primary-container' : cssColor('on-surface')"
                            :variant="pointsNeededToWin === value ? 'flat' : 'outlined'"
                            class="settings__choice"
                            height="40"
                            rounded="lg"
                            @click="pointsNeededToWin = value"
                        >
                            {{ value }}
                        </v-btn>
                    </div>
                </div>
                <v-divider class="settings__divider"/>
                <div class="settings__group">
                    <span class="settings__row-label">{{ $t('settings.number-of-entities-per-round') }}</span>
                    <div class="settings__choices" style="--columns: 3">
                        <v-btn
                            v-for="value in [4, 5, 6]"
                            :key="value"
                            :aria-pressed="numberOfEntitiesPerRound === value"
                            :color="numberOfEntitiesPerRound === value ? 'primary-container' : cssColor('on-surface')"
                            :variant="numberOfEntitiesPerRound === value ? 'flat' : 'outlined'"
                            class="settings__choice"
                            height="40"
                            rounded="lg"
                            @click="numberOfEntitiesPerRound = value"
                        >
                            {{ value }}
                        </v-btn>
                    </div>
                </div>
                <v-divider class="settings__divider"/>
                <div class="settings__row">
                    <span class="settings__row-label">{{ $t('settings.sounds') }}</span>
                    <v-switch
                        v-model="sounds"
                        :aria-label="$t('settings.sounds')"
                        color="primary"
                        density="compact"
                        inset
                    />
                </div>
            </v-sheet>

            <div class="settings__label settings__label--spaced text-section-label text-primary">{{ $t('settings.entities') }}</div>
            <v-sheet class="settings__lists" color="surface-container-low" rounded="xl">
                <label v-for="item in entityList" :key="item.value" class="settings__list">
                    <input
                        :checked="entities.includes(item.value)"
                        class="d-sr-only"
                        type="checkbox"
                        @change="toggleEntity(item.value)"
                    >
                    <check-mark :model-value="entities.includes(item.value)"/>
                    <span class="settings__row-label flex-grow-1">{{ item.title }}</span>
                    <span class="settings__list-language on-surface-variant">{{ item.language }}</span>
                </label>
            </v-sheet>
        </v-form>
    </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex';
import CheckMark from '@/components/CheckMark.vue';
import PageHeader from '@/components/PageHeader.vue';
import {cssColor} from '@/services/theme';
import entities from '../data/entities';

export default {
    components: {
        CheckMark,
        PageHeader,
    },

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

        themes() {
            return [
                {
                    value: 'light',
                    title: this.$t('themes.light'),
                },
                {
                    value: 'dark',
                    title: this.$t('themes.dark'),
                },
            ];
        },

        theme: {
            get() {
                return this.$store.state.settings.theme;
            },
            set(value) {
                this.updateSettings(Object.assign({}, this.settings, {theme: value}));
            },
        },

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
                Object.keys(entities[language]).forEach((key) => {
                    acc.push({
                        title: entities[language][key].name,
                        language: this.$t('language', language),
                        value: language + '.' + key,
                    });
                });
                return acc;
            }, []);
        },
    },

    methods: {
        ...mapMutations([
            'updateSettings',
        ]),

        cssColor,

        toggleEntity(value) {
            if (this.entities.includes(value)) {
                this.entities = this.entities.filter((entity) => entity !== value);
            } else {
                this.entities = this.entities.concat([value]);
            }
        },
    },
};
</script>

<style scoped>
.settings {
    gap: 6px;
}

.settings__label {
    padding: 4px 8px;
}

.settings__label--spaced {
    padding-top: 12px;
}

.settings__row {
    min-height: 60px;
    padding: 0 12px 0 16px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.settings__row-label {
    flex: 1 1 auto;
    font-size: 16px;
    font-weight: 500;
}

.settings__divider {
    margin: 0 16px;
    opacity: 1;
    border-color: rgb(var(--v-theme-outline-variant));
}

.settings__toggle {
    flex: none;
    border-color: rgb(var(--v-theme-outline)) !important;
}

.settings__toggle .v-btn {
    font-size: 14px;
    font-weight: 600;
    padding: 0 14px;
}

.settings__toggle .v-btn:not(:last-child) {
    border-inline-end-color: rgb(var(--v-theme-outline)) !important;
}

.settings__group {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.settings__choices {
    display: grid;
    grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
    gap: 8px;
}

.settings__choice {
    font-size: 15px;
    min-width: 0;
    padding: 0;
}

.settings__choice.v-btn--variant-outlined {
    border-color: rgb(var(--v-theme-outline-variant));
}

.settings__lists {
    padding: 4px 0;
}

.settings__list {
    min-height: 52px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    gap: 14px;
    cursor: pointer;
}

.settings__list-language {
    font-size: 13px;
}
</style>
