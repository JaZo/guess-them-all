<template>
    <v-text-field
        ref="input"
        v-model="name"
        prepend-icon="mdi-account"
        :label="$t('teams.player-name')"
    >
        <template #append>
            <v-btn color="red-darken-2" icon="mdi-minus-circle" variant="text" @click="$emit('delete')"/>
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
