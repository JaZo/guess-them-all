<template>
    <v-app>
        <v-layout class="rounded rounded-md">
            <v-app-bar>
                <template #prepend>
                    <v-btn v-if="allowHome" icon="mdi-close" @click="home"></v-btn>
                    <v-btn v-if="allowBack" icon="mdi-arrow-left" @click="$router.back()"></v-btn>
                </template>

                <v-app-bar-title>{{ title }}</v-app-bar-title>

                <template #append>
                    <v-btn v-if="allowSettings" icon="mdi-cog" @click="settings"></v-btn>
                </template>
            </v-app-bar>

            <v-main class="d-flex align-center justify-center">
                <transition
                    :enter-active-class="transitionEnterClass"
                    :leave-active-class="transitionLeaveClass"
                    mode="out-in"
                >
                    <router-view/>
                </transition>
            </v-main>
        </v-layout>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            transitionEnterClass: null,
            transitionLeaveClass: null,
            offlineInstalledSnackbarOpen: false,
            offlineUpdatedSnackbarOpen: false,
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
            const deepestRouteWithTitle = this.$route.matched.slice().reverse().find(record => record.meta.title);
            if (deepestRouteWithTitle) {
                return deepestRouteWithTitle.meta.title();
            }

            return this.$t('app.title');
        },
    },

    watch: {
        $route(to, from) {
            const baseClass = 'animate__animated page-transition ';
            const toDepth = to.path.replace(/\/+$/, '').concat('/').split('/').length;
            const fromDepth = from.path.replace(/\/+$/, '').concat('/').split('/').length;

            this.transitionEnterClass = baseClass + (toDepth < fromDepth ? 'animate__slideInLeft' : 'animate__slideInRight');
            this.transitionLeaveClass = baseClass + (toDepth < fromDepth ? 'animate__slideOutRight' : 'animate__slideOutLeft');
        },
    },

    mounted() {
        // TODO: Snackbar
        /*this.$bus.$on('offline-installed', () => {
          this.offlineInstalledSnackbarOpen = true;
        });
        this.$bus.$on('offline-updated', () => {
          this.offlineUpdatedSnackbarOpen = true;
        });*/
    },

    methods: {
        home() {
            this.$router.replace({name: 'home'});
        },

        settings() {
            this.$router.push({name: 'settings'});
        },
    },
};
</script>

<style>
:root {
    --animate-duration: 0.2s;
}
</style>
