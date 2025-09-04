<script setup>
import LoginComponent from '@/components/LoginComponent.vue';
</script>

<template>
    <section class="relative mt-15 pb-40">
        <div class="grid place-items-center px-22">
        <h1 class=" text-3xl font-bold text-[#141414] leading-normal">Conecte-se com o IFC e  fortaleça a comunidade:</h1>
        <p class="text-3xl font-semibold text-[#509973] mr-10">Informe...</p>
         <RouterLink to= "/Login">
            <LoginComponent class="px-12 mr-12 mt-5"/>
        </RouterLink>
    </div>
    <img src="/overlay.png" alt="ondas" class="left-0 bottom-0 w-[100vw] h-40 z-0"
      style="pointer-events: none;">
      <img src="/bannerImg.png" alt="banner" class="max-w-xl mx-auto object-contain mt-6">
    </section>
</template>

<style scoped>

</style>