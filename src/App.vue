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

        <transition
            mode="out-in"
            :enter-active-class="transitionEnterClass"
            :leave-active-class="transitionLeaveClass"
        >
            <router-view/>
        </transition>

        <md-snackbar ref="offlineInstalledSnackbar" md-position="bottom right">
            <span>{{ $t('app.offline-installed') }}</span>
            <md-button class="md-accent" @click="closeOfflineInstalled()">{{ $t('app.offline-close') }}</md-button>
        </md-snackbar>
        <md-snackbar ref="offlineUpdatedSnackbar" md-position="bottom right">
            <span>{{ $t('app.offline-updated') }}</span>
            <md-button class="md-accent" @click="closeOfflineUpdated()">{{ $t('app.offline-close') }}</md-button>
        </md-snackbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                transitionEnterClass: null,
                transitionLeaveClass: null
            };
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
        },

        watch: {
            $route(to, from) {
                const baseClass = 'animated page-transition ';
                const toDepth = to.path.replace(/\/+$/, '').concat('/').split('/').length;
                const fromDepth = from.path.replace(/\/+$/, '').concat('/').split('/').length;

                this.transitionEnterClass = baseClass + (toDepth < fromDepth ? 'slideInLeft' : 'slideInRight');
                this.transitionLeaveClass = baseClass + (toDepth < fromDepth ? 'slideOutRight' : 'slideOutLeft');
            }
        },

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
        }
    }
</script>

<style>
    @import '../node_modules/vue-material/dist/vue-material.css';
    @import '../node_modules/animate.css/animate.css';

    .main-content {
        padding: 16px;
    }

    .page-transition {
        animation-duration: .2s;
    }
</style>
