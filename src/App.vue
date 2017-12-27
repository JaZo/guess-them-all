<template>
    <div id="app">
        <md-toolbar>
            <md-button v-if="allowHome" class="md-icon-button" @click="home">
                <md-icon>close</md-icon>
            </md-button>
            <md-button v-if="allowBack" class="md-icon-button" @click="$router.back()">
                <md-icon>arrow_back</md-icon>
            </md-button>

            <h1 class="md-title" style="flex: 1">{{ title }}</h1>

            <md-button v-if="allowSettings" key="settings" class="md-icon-button" @click="settings">
                <md-icon>settings</md-icon>
            </md-button>
        </md-toolbar>

        <router-view></router-view>

        <md-snackbar md-position="bottom right" ref="offlineInstalledSnackbar">
            <span>{{ $t('app.offline-installed') }}</span>
            <md-button class="md-accent" @click="closeOfflineInstalled()">{{ $t('app.offline-close') }}</md-button>
        </md-snackbar>
        <md-snackbar md-position="bottom right" ref="offlineUpdatedSnackbar">
            <span>{{ $t('app.offline-updated') }}</span>
            <md-button class="md-accent" @click="closeOfflineUpdated()">{{ $t('app.offline-close') }}</md-button>
        </md-snackbar>
    </div>
</template>

<script>
    export default {
        name: 'app',
        mounted() {
            this.$bus.$on('offline-installed', this.openOfflineInstalled);
            this.$bus.$on('offline-updated', this.openOfflineUpdated);
        },
        methods: {
            home() {
                this.$router.replace({name: 'home'});
            },
            settings() {
                this.$router.push({name: 'settings'});
            },
            openOfflineInstalled() {
                this.$refs.offlineInstalledSnackbar.open();
            },
            closeOfflineInstalled() {
                this.$refs.offlineInstalledSnackbar.close();
            },
            openOfflineUpdated() {
                this.$refs.offlineUpdatedSnackbar.open();
            },
            closeOfflineUpdated() {
                this.$refs.offlineUpdatedSnackbar.close();
            }
        },
        computed: {
            allowBack() {
                return !this.$route.matched.some(record => !record.meta.allowBack);
            },
            allowHome() {
                return !!this.$route.meta.allowHome;
            },
            allowSettings() {
                return !this.$route.matched.some(record => !record.meta.allowSettings);
            },
            title() {
                let deepestRouteWithTitle = this.$route.matched.slice().reverse().find(record => record.meta.title);
                if (deepestRouteWithTitle) {
                    return deepestRouteWithTitle.meta.title();
                }

                return this.$t('app.title');
            }
        }
    }
</script>

<style>
    @import '../node_modules/vue-material/dist/vue-material.css';

    .main-content {
        padding: 16px;
    }
</style>
