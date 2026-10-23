<template>
    <span
        class="check-mark"
        :class="{'check-mark--checked': modelValue}"
        :style="{width: `${size}px`, height: `${size}px`}"
        aria-hidden="true"
    >
        <v-icon icon="mdi-check" :size="Math.round(size * 0.7)"/>
    </span>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        size: {
            type: Number,
            default: 22,
        },
    },
};
</script>

<style scoped>
.check-mark {
    flex: none;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    border: 2px solid rgb(var(--v-theme-on-surface-variant));
    color: transparent;
    transition: background-color 0.15s, border-color 0.15s;
}

.check-mark--checked {
    border-color: rgb(var(--v-theme-primary));
    background: rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-on-primary));
}

.check-mark .v-icon {
    opacity: 1;
}
</style>
