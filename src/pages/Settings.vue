<template>
    <div>
        <md-dialog-alert
            ref="chooseEntitiesDialog"
            :md-title="$t('settings.dialog.title')"
            :md-content="$t('settings.dialog.content')"
            :md-ok-text="$t('settings.dialog.ok')"
        />

        <md-list>
            <md-list-item>
                <md-input-container>
                    <label>{{ $t('settings.locale') }}</label>
                    <md-select v-model="locale">
                        <md-option v-for="locale in locales" :key="locale.value" :value="locale.value">{{ locale.label }}</md-option>
                    </md-select>
                </md-input-container>
            </md-list-item>

            <md-list-item>
                <md-input-container>
                    <label>{{ $t('settings.points-needed-to-win') }}</label>
                    <md-select v-model="pointsNeededToWin">
                        <md-option :value="15">15</md-option>
                        <md-option :value="30">30</md-option>
                        <md-option :value="45">45</md-option>
                        <md-option :value="60">60</md-option>
                    </md-select>
                </md-input-container>
            </md-list-item>

            <md-list-item>
                <md-input-container>
                    <label>{{ $t('settings.number-of-entities-per-round') }}</label>
                    <md-select v-model="numberOfEntitiesPerRound">
                        <md-option :value="4">4</md-option>
                        <md-option :value="5">5</md-option>
                        <md-option :value="6">6</md-option>
                    </md-select>
                </md-input-container>
            </md-list-item>

            <md-list-item>
                <md-input-container>
                    <label>{{ $t('settings.entities') }}</label>
                    <md-select v-model="entities" multiple>
                        <template v-for="(lists, language) in entityLists">
                            <md-subheader :key="language">{{ $t('language', language) }}</md-subheader>
                            <template v-for="(list, key) in lists">
                                <md-option :value="language + '.' + key" :key="language + '.' + key">{{ list.name }}</md-option>
                            </template>
                        </template>
                    </md-select>
                </md-input-container>
            </md-list-item>
        </md-list>
    </div>
</template>

<script>
    import { mapMutations, mapState } from 'vuex';
    import entities from '../data/entities';

    export default {
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

            entityLists() {
                return entities;
            }
        },

        beforeRouteLeave(to, from, next) {
            if (this.entities.length < 1) {
                this.$refs.chooseEntitiesDialog.open();
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
