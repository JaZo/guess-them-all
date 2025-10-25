<template>
    <v-app :theme="$store.state.settings.theme">
        <v-layout>
            <v-app-bar color="primary">
                <template #prepend>
                    <v-btn v-if="allowHome" icon="mdi-close" @click="home"></v-btn>
                    <v-btn v-if="allowBack" icon="mdi-arrow-left" @click="$router.back()"></v-btn>
                </template>

                <v-app-bar-title>{{ title }}</v-app-bar-title>

                <template #append>
                    <v-btn v-if="allowSettings" icon="mdi-cog" @click="settings"></v-btn>
                </template>
            </v-app-bar>

            <v-main>
                <router-view v-slot="{ Component }">
                    <transition
                        :enter-active-class="transitionEnterClass"
                        :leave-active-class="transitionLeaveClass"
                        mode="out-in"
                    >
                        <component :is="Component" />
                    </transition>
                </router-view>
            </v-main>

            <v-snackbar v-model="offlineReady">
                {{ $t('app.offline-installed') }}
                <template #actions>
                    <v-btn color="primary" @click="close">
                        {{ $t('app.offline-close') }}
                    </v-btn>
                </template>
            </v-snackbar>
            <v-snackbar v-model="needRefresh">
                {{ $t('app.offline-updated') }}
                <template #actions>
                    <v-btn color="primary" @click="updateServiceWorker">
                        {{ $t('app.offline-update') }}
                    </v-btn>
                </template>
            </v-snackbar>
        </v-layout>
    </v-app>
</template>

<script>
import { useRegisterSW } from 'virtual:pwa-register/vue';

export default {
    setup() {
        const {
            offlineReady,
            needRefresh,
            updateServiceWorker,
        } = useRegisterSW();

        function close() {
            offlineReady.value = false;
            needRefresh.value = false;
        }

        return {
            offlineReady,
            needRefresh,
            updateServiceWorker,
            close,
        };
    },

    data() {
        return {
            transitionEnterClass: null,
            transitionLeaveClass: null,
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
