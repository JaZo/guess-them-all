<template>
    <v-app :theme="$store.state.settings.theme">
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
                <v-btn color="primary" variant="text" @click="close">
                    {{ $t('app.offline-close') }}
                </v-btn>
            </template>
        </v-snackbar>
        <v-snackbar v-model="needRefresh">
            {{ $t('app.offline-updated') }}
            <template #actions>
                <v-btn color="primary" variant="text" @click="updateServiceWorker">
                    {{ $t('app.offline-update') }}
                </v-btn>
            </template>
        </v-snackbar>
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

    watch: {
        $route(to, from) {
            const baseClass = 'animate__animated page-transition ';
            const toDepth = to.path.replace(/\/+$/, '').concat('/').split('/').length;
            const fromDepth = from.path.replace(/\/+$/, '').concat('/').split('/').length;

            this.transitionEnterClass = baseClass + (toDepth < fromDepth ? 'animate__slideInLeft' : 'animate__slideInRight');
            this.transitionLeaveClass = baseClass + (toDepth < fromDepth ? 'animate__slideOutRight' : 'animate__slideOutLeft');
        },
    },
};
</script>
