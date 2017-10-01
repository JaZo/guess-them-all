<template>
    <div class="new">
        <md-list>
            <md-list-item v-for="(entity, index) in entities" :key="index">
                <span>{{ entity }}</span>
            </md-list-item>
        </md-list>
        <md-progress :md-progress="progress"></md-progress>
    </div>
</template>

<script>
    import { mapMutations, mapState } from 'vuex'

    const TIME_LIMIT = 30;
    const PROGRESS_TICKS_PER_SECOND = 15; // i.e. FPS for progress bar

    export default {
        data() {
            return {
                interval: null,
                progressCounter: this.$store.state.time * PROGRESS_TICKS_PER_SECOND
            }
        },
        mounted() {
            this.interval = setInterval(this.loop, 1000 / PROGRESS_TICKS_PER_SECOND);
        },
        methods: {
            ...mapMutations([
                'setTime'
            ]),
            loop() {
                this.progressCounter = Math.min(this.progressCounter + 1, PROGRESS_TICKS_PER_SECOND * TIME_LIMIT);

                if (this.progressCounter % PROGRESS_TICKS_PER_SECOND === 0) {
                    this.setTime(Math.min(Math.floor(this.progressCounter / PROGRESS_TICKS_PER_SECOND), TIME_LIMIT));
                }

                if (this.progressCounter >= PROGRESS_TICKS_PER_SECOND * TIME_LIMIT) {
                    clearInterval(this.interval);
                    this.continueGame();
                }
            },
            continueGame() {
                this.$router.push({name: 'game-time-over'});
            }
        },
        computed: {
            ...mapState([
                'entities',
                'time'
            ]),
            progress() {
                return this.progressCounter / PROGRESS_TICKS_PER_SECOND / TIME_LIMIT * 100;
            }
        }
    }
</script>
