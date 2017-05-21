<template>
    <div id="app">
        <md-toolbar>
            <md-button v-if="allowBack" class="md-icon-button" @click.native="$router.back()">
                <md-icon>arrow_back</md-icon>
            </md-button>
            <h1 class="md-title">30 Seconds</h1>
        </md-toolbar>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        computed: {
            allowBack() {
                return !this.$route.matched.some(record => !record.meta.allowBack);
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
