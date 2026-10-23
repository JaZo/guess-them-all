<template>
    <div class="page">
        <page-header back/>

        <div class="page__intro">
            <h1 class="text-page-title">{{ $t('rules.title') }}</h1>
            <p class="text-intro on-surface-variant">{{ $t('rules.intro', {seconds: settings.timeLimit}) }}</p>
        </div>

        <div class="page__body rules">
            <v-sheet class="rules__section" color="primary-container" rounded="xxl" tag="section">
                <h2 class="rules__heading font-headline">
                    <v-icon icon="mdi-timer-outline"/>
                    {{ $t('rules.how.title') }}
                </h2>
                <div v-for="i in 3" :key="i" class="rules__rule">
                    <blob-badge :size="36" color="primary" shape="scallop">
                        <span class="rules__number on-primary">{{ i }}</span>
                    </blob-badge>
                    <p class="rules__text">{{ $t(`rules.how.${i}`) }}</p>
                </div>
            </v-sheet>

            <v-sheet class="rules__section" color="surface-container" rounded="xxl" tag="section">
                <h2 class="rules__heading font-headline text-secondary">
                    <v-icon icon="mdi-cancel"/>
                    {{ $t('rules.nots.title') }}
                </h2>
                <div v-for="i in 5" :key="i" class="rules__rule">
                    <blob-badge :size="36" color="secondary-container" shape="scallop">
                        <span class="rules__number on-secondary-container">{{ i + 3 }}</span>
                    </blob-badge>
                    <p class="rules__text">{{ $t(`rules.nots.${i}`) }}</p>
                </div>
            </v-sheet>

            <v-sheet class="rules__section rules__section--tight" color="tertiary-container" rounded="xxl" tag="section">
                <h2 class="rules__heading font-headline">
                    <v-icon icon="mdi-music"/>
                    {{ $t('rules.allowed.title') }}
                </h2>
                <p class="rules__allowed">{{ $t('rules.allowed.text') }}</p>
            </v-sheet>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import BlobBadge from '@/components/BlobBadge.vue';
import PageHeader from '@/components/PageHeader.vue';

export default {
    components: {
        BlobBadge,
        PageHeader,
    },

    computed: mapState([
        'settings',
    ]),
};
</script>

<style scoped>
.rules {
    gap: 14px;
    padding-bottom: 28px;
}

.rules__section {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.rules__section--tight {
    gap: 12px;
}

.rules__heading {
    margin: 0;
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.rules__rule {
    display: flex;
    gap: 14px;
    align-items: flex-start;
}

.rules__number {
    font-size: 16px;
    font-weight: 900;
}

.rules__text {
    margin: 0;
    padding-top: 6px;
    font-size: 15px;
    line-height: 22px;
}

.rules__allowed {
    margin: 0;
    font-size: 17px;
    line-height: 24px;
    font-weight: 600;
}
</style>
