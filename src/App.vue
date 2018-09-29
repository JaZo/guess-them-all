<template>
    <div id="app">
        <md-toolbar class="md-primary">
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

        <md-content>
            <transition
                :enter-active-class="transitionEnterClass"
                :leave-active-class="transitionLeaveClass"
                mode="out-in"
            >
                <router-view/>
            </transition>
        </md-content>

        <md-snackbar :md-active.sync="offlineInstalledSnackbarOpen" md-position="center">
            <span>{{ $t('app.offline-installed') }}</span>
            <md-button class="md-primary" @click="offlineInstalledSnackbarOpen = false">{{ $t('app.offline-close') }}</md-button>
        </md-snackbar>
        <md-snackbar :md-active.sync="offlineUpdatedSnackbarOpen" md-position="center">
            <span>{{ $t('app.offline-updated') }}</span>
            <md-button class="md-primary" @click="offlineUpdatedSnackbarOpen = false">{{ $t('app.offline-close') }}</md-button>
        </md-snackbar>
    </div>
</template>

<script>
export default {
    data () {
        return {
            transitionEnterClass: null,
            transitionLeaveClass: null,
            offlineInstalledSnackbarOpen: false,
            offlineUpdatedSnackbarOpen: false,
        };
    },

    computed: {
        allowBack () {
            return !this.$route.matched.some(record => !record.meta.allowBack);
        },

        allowHome () {
            return !!this.$route.meta.allowHome;
        },

        allowSettings () {
            return !this.$route.matched.some(record => !record.meta.allowSettings);
        },

        title () {
            let deepestRouteWithTitle = this.$route.matched.slice().reverse().find(record => record.meta.title);
            if (deepestRouteWithTitle) {
                return deepestRouteWithTitle.meta.title();
            }

            return this.$t('app.title');
        },
    },

    watch: {
        $route (to, from) {
            const baseClass = 'animated page-transition ';
            const toDepth = to.path.replace(/\/+$/, '').concat('/').split('/').length;
            const fromDepth = from.path.replace(/\/+$/, '').concat('/').split('/').length;

            this.transitionEnterClass = baseClass + (toDepth < fromDepth ? 'slideInLeft' : 'slideInRight');
            this.transitionLeaveClass = baseClass + (toDepth < fromDepth ? 'slideOutRight' : 'slideOutLeft');
        },
    },

    mounted () {
        this.$bus.$on('offline-installed', () => {
            this.offlineInstalledSnackbarOpen = true;
        });
        this.$bus.$on('offline-updated', () => {
            this.offlineUpdatedSnackbarOpen = true;
        });
    },

    methods: {
        home () {
            this.$router.replace({ name: 'home' });
        },

        settings () {
            this.$router.push({ name: 'settings' });
        },
    },
};
</script>

<style>
    @import '../node_modules/vue-material/dist/vue-material.css';
    @import '../node_modules/vue-material/dist/theme/default.css';
    @import '../node_modules/animate.css/animate.css';

    html.md-theme-default {
        background-color: #fff;
        background-color: var(--md-theme-default-background, #fff);
    }

    .main-content {
        padding: 16px;
    }

    .page-transition {
        animation-duration: .2s;
    }
</style>
