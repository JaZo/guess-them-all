<template>
    <v-container>
        <v-list lines="two">
            <v-list-item
                v-for="i in 9"
                :key="i"
            >
                <template #prepend>
                    <v-icon color="primary" :icon="`mdi-numeric-${i}-circle`" size="x-large"/>
                </template>
                {{ $t(`rules.rules.${i}`) }}
            </v-list-item>
        </v-list>
    </v-container>
</template>
