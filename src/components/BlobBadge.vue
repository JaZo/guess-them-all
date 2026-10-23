<template>
    <div class="blob-badge" :style="{width: `${size}px`, height: `${size}px`}">
        <svg class="blob-badge__shape" :class="textClass(color)" viewBox="0 0 100 100" aria-hidden="true">
            <path :d="path" fill="currentColor"/>
        </svg>
        <div class="blob-badge__content">
            <slot/>
        </div>
    </div>
</template>

<script>
import {textClass} from '@/services/theme';

const SHAPES = {
    scallop: 'M50 1.2L53.1 2.1L56 4.4L58.6 6.8L61.2 8.3L64.1 8.3L67.6 7.5L71.2 7L74.4 7.7L76.7 10.1L78 13.5L79 16.9L80.5 19.5L83.1 21L86.5 22L89.9 23.3L92.3 25.6L93 28.8L92.5 32.4L91.7 35.9L91.7 38.8L93.2 41.4L95.6 44L97.9 46.9L98.8 50L97.9 53.1L95.6 56L93.2 58.6L91.7 61.2L91.7 64.1L92.5 67.6L93 71.2L92.3 74.4L89.9 76.7L86.5 78L83.1 79L80.5 80.5L79 83.1L78 86.5L76.7 89.9L74.4 92.3L71.2 93L67.6 92.5L64.1 91.7L61.2 91.7L58.6 93.2L56 95.6L53.1 97.9L50 98.8L46.9 97.9L44 95.6L41.4 93.2L38.8 91.7L35.9 91.7L32.4 92.5L28.8 93L25.6 92.3L23.3 89.9L22 86.5L21 83.1L19.5 80.5L16.9 79L13.5 78L10.1 76.7L7.7 74.4L7 71.2L7.5 67.6L8.3 64.1L8.3 61.2L6.8 58.6L4.4 56L2.1 53.1L1.2 50L2.1 46.9L4.4 44L6.8 41.4L8.3 38.8L8.3 35.9L7.5 32.4L7 28.8L7.7 25.6L10.1 23.3L13.5 22L16.9 21L19.5 19.5L21 16.9L22 13.5L23.3 10.1L25.6 7.7L28.8 7L32.4 7.5L35.9 8.3L38.8 8.3L41.4 6.8L44 4.4L46.9 2.1Z',
    wave: 'M50 1L54.7 2.4L58.8 5.9L62.2 9.6L65.7 12.1L69.9 12.8L75 12.6L80.3 13L84.6 15.4L87 19.7L87.4 25L87.2 30.1L87.9 34.3L90.4 37.8L94.1 41.2L97.6 45.3L99 50L97.6 54.7L94.1 58.8L90.4 62.2L87.9 65.7L87.2 69.9L87.4 75L87 80.3L84.6 84.6L80.3 87L75 87.4L69.9 87.2L65.7 87.9L62.2 90.4L58.8 94.1L54.7 97.6L50 99L45.3 97.6L41.2 94.1L37.8 90.4L34.3 87.9L30.1 87.2L25 87.4L19.7 87L15.4 84.6L13 80.3L12.6 75L12.8 69.9L12.1 65.7L9.6 62.2L5.9 58.8L2.4 54.7L1 50L2.4 45.3L5.9 41.2L9.6 37.8L12.1 34.3L12.8 30.1L12.6 25L13 19.7L15.4 15.4L19.7 13L25 12.6L30.1 12.8L34.3 12.1L37.8 9.6L41.2 5.9L45.3 2.4Z',
};

export default {
    props: {
        shape: {
            type: String,
            default: 'scallop',
            validator: (value) => Object.keys(SHAPES).includes(value),
        },
        size: {
            type: Number,
            default: 36,
        },
        // Theme color name
        color: {
            type: String,
            default: 'primary',
        },
    },

    computed: {
        path() {
            return SHAPES[this.shape];
        },
    },

    methods: {
        textClass,
    },
};
</script>

<style scoped>
.blob-badge {
    position: relative;
    flex: none;
}

.blob-badge__shape {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}

.blob-badge__content {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
