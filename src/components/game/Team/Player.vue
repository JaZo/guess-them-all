<template>
    <md-list-item>
        <md-icon>person</md-icon>
        <md-input-container>
            <label>Player name</label>
            <md-input v-model="name"></md-input>
        </md-input-container>
        <md-button class="md-icon-button md-list-action" @click.native="$emit('delete')">
            <md-icon class="md-warn">remove_circle</md-icon>
        </md-button>
    </md-list-item>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                require: true
            }
        },
        computed: {
            name: {
                get() {
                    return this.data.name;
                },
                set(value) {
                    this.$emit('update', Object.assign({}, this.data, {name: value}));
                }
            }
        }
    }
</script>
