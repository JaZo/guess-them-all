<template>
    <div id="app">
        <md-toolbar>
            <md-button v-if="allowBack" class="md-icon-button" @click="$router.back()">
                <md-icon>arrow_back</md-icon>
            </md-button>
            <h1 class="md-title">{{ title }}</h1>
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
            },
            title() {
                let deepestRouteWithTitle = this.$route.matched.slice().reverse().find(record => record.meta.title);
                if (deepestRouteWithTitle) {
                    return deepestRouteWithTitle.meta.title();
                }

                return '30 Seconds';
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
