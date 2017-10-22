<template>
    <div class="new">
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
        </md-list>
    </div>
</template>

<script>
    import { mapMutations, mapState } from 'vuex';

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
            }
        },
        methods: mapMutations([
            'updateSettings'
        ])
    }
</script>
