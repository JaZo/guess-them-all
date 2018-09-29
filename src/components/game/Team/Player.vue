<template>
    <md-list-item>
        <md-icon>person</md-icon>

        <md-field>
            <label>{{ $t('teams.player-name') }}</label>
            <md-input ref="input" v-model="name" />
        </md-field>

        <md-button class="md-icon-button md-list-action" @click="$emit('delete')">
            <md-icon class="md-accent">remove_circle</md-icon>
        </md-button>
    </md-list-item>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },

    computed: {
        name: {
            get () {
                return this.data.name;
            },
            set (value) {
                this.$emit('update', Object.assign({}, this.data, { name: value }));
            },
        },
    },

    methods: {
        focus () {
            this.$refs.input.$el.focus();
        },
    },
};
</script>
