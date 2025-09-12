<script setup>
import { RouterView, useRoute } from 'vue-router';

import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

const route = useRoute();
</script>

<template>

    <HeaderComponent v-if="!route.meta.hideLayout" />

    <main>
        <RouterView />
    </main>

    <FooterComponent v-if="!route.meta.hideLayout" />

</template>

<style scoped>

</style>
