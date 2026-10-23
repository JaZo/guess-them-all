<template>
    <v-text-field
        ref="input"
        v-model="name"
        prepend-inner-icon="mdi-account"
        :label="$t('teams.player-name')"
    >
        <template #append-inner>
            <v-btn color="error" icon="mdi-minus-circle" size="small" variant="text" @click="$emit('delete')"/>
        </template>
    </v-text-field>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },

    emits: ['update', 'delete'],

    computed: {
        name: {
            get() {
                return this.data.name;
            },
            set(value) {
                this.$emit('update', Object.assign({}, this.data, {name: value}));
            },
        },
    },

    methods: {
        focus() {
            this.$refs.input.$el.querySelector('input').select();
        },
    },
};
</script>
