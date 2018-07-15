<template>
    <div>
        <md-dialog-alert
            :md-active.sync="chooseEntitiesDialogOpen"
            :md-title="$t('settings.dialog.title')"
            :md-content="$t('settings.dialog.content')"
            :md-confirm-text="$t('settings.dialog.ok')"
        />

        <md-list>
            <md-list-item>
                <md-field>
                    <label>{{ $t('settings.locale') }}</label>
                    <md-select v-model="locale">
                        <md-option v-for="locale in locales" :key="locale.value" :value="locale.value">{{ locale.label }}</md-option>
                    </md-select>
                </md-field>
            </md-list-item>

            <md-list-item>
                <md-field>
                    <label>{{ $t('settings.points-needed-to-win') }}</label>
                    <md-select v-model="pointsNeededToWin">
                        <md-option :value="15">15</md-option>
                        <md-option :value="30">30</md-option>
                        <md-option :value="45">45</md-option>
                        <md-option :value="60">60</md-option>
                    </md-select>
                </md-field>
            </md-list-item>

            <md-list-item>
                <md-field>
                    <label>{{ $t('settings.number-of-entities-per-round') }}</label>
                    <md-select v-model="numberOfEntitiesPerRound">
                        <md-option :value="4">4</md-option>
                        <md-option :value="5">5</md-option>
                        <md-option :value="6">6</md-option>
                    </md-select>
                </md-field>
            </md-list-item>

            <md-list-item>
                <md-field>
                    <label>{{ $t('settings.entities') }}</label>
                    <md-select v-model="entities" multiple>
                        <template v-for="(lists, language) in entityLists">
                            <md-optgroup :key="language" :label="$t('language', language)">
                                <md-option v-for="(list, key) in lists" :value="language + '.' + key" :key="language + '.' + key">{{ list.name }}</md-option>
                            </md-optgroup>
                        </template>
                    </md-select>
                </md-field>
            </md-list-item>

            <md-list-item>
                <md-field>
                    <label>{{ $t('settings.sounds') }}</label>
                    <md-select v-model="sounds">
                        <md-option :value="true">{{ $t('settings.sounds-enabled') }}</md-option>
                        <md-option :value="false">{{ $t('settings.sounds-disabled') }}</md-option>
                    </md-select>
                </md-field>
            </md-list-item>
        </md-list>
    </div>
</template>

<script>
    import { mapMutations, mapState } from 'vuex';
    import entities from '../data/entities';

    export default {
        data() {
            return {
                chooseEntitiesDialogOpen: false
            };
        },

        computed: {
            ...mapState([
                'settings'
            ]),

            locales() {
                return Object.keys(this.$i18n.messages).map((locale) => {
                    return {
                        value: locale,
                        label: this.$t('language', locale)
                    };
                });
            },

            locale: {
                get() {
                    return this.$store.state.settings.locale;
                },
                set(value) {
                    this.updateSettings(Object.assign({}, this.settings, {locale: value}));
                }
            },

            numberOfEntitiesPerRound: {
                get() {
                    return this.$store.state.settings.numberOfEntitiesPerRound;
                },
                set(value) {
                    this.updateSettings(Object.assign({}, this.settings, {numberOfEntitiesPerRound: value}));
                }
            },

            pointsNeededToWin: {
                get() {
                    return this.$store.state.settings.pointsNeededToWin;
                },
                set(value) {
                    this.updateSettings(Object.assign({}, this.settings, {pointsNeededToWin: value}));
                }
            },

            entities: {
                get() {
                    return this.$store.state.settings.entities;
                },
                set(value) {
                    this.updateSettings(Object.assign({}, this.settings, {entities: value}));
                }
            },

            sounds: {
                get() {
                    return this.$store.state.settings.sounds;
                },
                set(value) {
                    this.updateSettings(Object.assign({}, this.settings, {sounds: value}));
                }
            },

            entityLists() {
                return entities;
            }
        },

        beforeRouteLeave(to, from, next) {
            if (this.entities.length < 1) {
                this.chooseEntitiesDialogOpen = true;
                next(false);
            } else {
                next();
            }
        },

        methods: mapMutations([
            'updateSettings'
        ])
    }
</script>
