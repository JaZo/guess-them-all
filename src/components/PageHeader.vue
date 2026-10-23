<template>
    <header class="page-header">
        <div>
            <v-btn
                v-if="back"
                :aria-label="$t('app.back')"
                :color="cssColor(color)"
                icon="mdi-arrow-left"
                variant="text"
                @click="goBack"
            />
            <v-btn
                v-if="home"
                :aria-label="$t('app.home')"
                :color="cssColor(color)"
                icon="mdi-close"
                variant="text"
                @click="goHome"
            />
        </div>
        <div>
            <v-btn
                v-if="settings"
                :aria-label="$t('app.settings')"
                :to="{name: 'settings'}"
                :color="cssColor('on-surface-variant')"
                icon="mdi-tune-variant"
                variant="text"
            />
        </div>
    </header>
</template>

<script>
import {cssColor} from '@/services/theme';

export default {
    props: {
        back: {
            type: Boolean,
            default: false,
        },
        // Route to replace with instead of going back in history
        backTo: {
            type: Object,
            default: null,
        },
        home: {
            type: Boolean,
            default: false,
        },
        settings: {
            type: Boolean,
            default: false,
        },
        color: {
            type: String,
            default: 'on-surface',
        },
    },

    methods: {
        cssColor,

        goBack() {
            if (this.backTo) {
                this.$router.replace(this.backTo);
            } else {
                this.$router.back();
            }
        },

        goHome() {
            this.$router.replace({name: 'home'});
        },
    },
};
</script>

<style scoped>
.page-header {
    position: relative;
    height: 64px;
    padding: 8px 8px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
