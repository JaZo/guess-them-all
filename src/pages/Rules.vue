<template>
    <v-list bg-color="transparent" lines="two">
        <v-list-item
            v-for="i in 9"
            :key="i"
        >
            <template #prepend>
                <v-icon color="primary" :icon="`mdi-numeric-${i}-circle`" size="40"/>
            </template>
            {{ $t(`rules.rules.${i}`) }}
        </v-list-item>
    </v-list>
</template>
