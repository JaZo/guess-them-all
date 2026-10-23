<template>
    <blob-badge shape="wave" :size="size" :color="inverted ? colors.onContainer : colors.accent">
        <span
            class="team-badge__initials"
            :class="textClass(inverted ? colors.container : colors.onAccent)"
            :style="{fontSize: `${Math.round(size * 0.35)}px`}"
        >
            {{ initials }}
        </span>
    </blob-badge>
</template>

<script>
import BlobBadge from '@/components/BlobBadge.vue';
import {teamColors, teamInitials} from '@/services/team';
import {textClass} from '@/services/theme';

export default {
    components: {
        BlobBadge,
    },

    props: {
        team: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        size: {
            type: Number,
            default: 40,
        },
        // Shape takes the "on" color and the initials the container color
        inverted: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        colors() {
            return teamColors(this.index);
        },

        initials() {
            return teamInitials(this.team.name);
        },
    },

    methods: {
        textClass,
    },
};
</script>

<style scoped>
.team-badge__initials {
    font-weight: 900;
    line-height: 1;
}
</style>
