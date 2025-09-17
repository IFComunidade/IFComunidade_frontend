<script setup>
import {ref, onMounted} from 'vue';
import LoginComponent from '@/components/LoginComponent.vue';
import { useUserStore } from '@/stores/userStore';

const useStore = useUserStore();
const lista = ['Informe...', 'Comunique...', 'Compartilhe...', 'Descubra...'];
const index = ref(0);

onMounted(() => {
    setInterval(() => {
        index.value = (index.value +1 ) % lista.length
    }, 5000)
})

</script>

<template>
    <section class="relative mt-15 pb-40">
        <div class="grid place-items-center px-22">
        <h1 class=" text-3xl font-bold text-[#141414] leading-normal">Conecte-se com o IFC e  fortaleça a comunidade:</h1>
        <p class="text-[1.8rem] font-semibold text-[#509973] mr-10">{{ lista[index] }}</p>
         <RouterLink to= "/Login" v-if="!useStore.isLoggedIn">
            <LoginComponent class="px-12 mr-12 mt-5"/>
        </RouterLink>
    </div>
    <img src="/overlay.png" alt="ondas" class="left-0 bottom-0 w-[100vw] h-40 z-0"
      style="pointer-events: none;">
      <img src="/bannerImg.png" alt="banner" class="w-[580px] mx-auto object-contain -mt-40">
      <h2 class="relative text-[1.6875rem] font-bold text-[#141414] w-fit mx-auto after:content-[''] after:block after:mt-5 after:mx-auto after:w-[70%] after:h-[1px] after:bg-[#386641]">Bem-vindo(a) ao IFComunidade</h2>
      <p class="text-center max-w-5xl mx-auto mt-4 px-4 text-[1.15rem] mt-5 text-[#736C6C]">Somos a rede de ouvidoria, informação e comunicação do IFC Campus Araquari.<br>Aqui, você pode acompanhar notícias, registrar denúncias, dar sugestões e se conectar com a comunidade acadêmica de forma acolhedora e segura.
      <br>
        <RouterLink to="/Cadastro" class="text-[#386641] font-extrabold">
            Cadastre-se,
        </RouterLink>
      <span class="font-extrabold">participe e contribua com a construção de uma comunidade mais consciente e conectada!</span>
    </p>
    <div class="grid place-items-center">
        <ul class="flex mt-26 space-x-80">
            <li class="flex flex-col items-center">
                <div class="p-4 border border-[#92B297] rounded-full flex items-center justify-center">
                <img src="/Megafone.png" alt="megafone" class="w-14 h-14 object-contain">
                </div>
                <h3 class="text-[1.3rem] font-bold mt-3">Comunique-se</h3>
                <p class="mt-4 max-w-[190px] text-center">Registre seu feedback e faça a diferença!</p>
            </li>
            <li class="flex flex-col items-center">
                <div class="p-4 border border-[#92B297] rounded-full flex items-center justify-center">
                <img src="/dados.png" alt="iconededados" class="w-14 h-14 object-contain">
                </div>
                <h3 class="text-[1.3rem] font-bold mt-3">Faça Parte</h3>
                <p class="mt-4 max-w-[230px] text-center">Participe de votações e construa decisões coletivas.</p>
            </li>
            <li class="flex flex-col items-center">
                <div class="p-4 border border-[#92B297] rounded-full flex items-center justify-center">
                <img src="/balao.png" alt="balaodeconversa" class="w-14 h-14 object-contain">
                </div>
                 <h3 class="text-[1.3rem] font-bold mt-3">Compartilhe</h3>
                <p class="mt-4 max-w-[160px] text-center">Conte sua experiência e eternize momentos.</p>
            </li>
        </ul>
    </div>
    <div class="bg-[#9ACCAC] mx-40 pt-100 mt-30 px-25 rounded-[6rem] shadow-[0_35px_40px_-15px_rgba(0,0,0,0.3)] relative">
        <h1 class="text-[#386641] font-semibold -mt-84 text-[1.6rem]">Acompanhe as ideias que movimentam o campus! </h1>
        <p class="text-[#FFFCF7] mt-8 w-150 text-[1.2rem]">Mergulhe nas ideias, vozes e iniciativas que movimentam os projetos do IFC. No MURALinterliga, você acompanha de perto tudo o que está acontecendo no campus.</p>
            <RouterLink to="/MURALinterliga" class="inline-flex items-center gap-2 bg-[#386641] text-[#FFFCF7] flex mt-12 p-2 px-5 text-[0.9rem] font-bold transition-transform duration-200 hover:scale-105">
                <span>Acessar o MURALinterliga</span>
                <img src="/seta.png" alt="seta">
            </RouterLink>
    </div>

    <img src="/marketing.png" alt="marketingmegafone" class="w-150 h-150 ml-auto absolute right-25 bottom-10 ">

    </section>
</template>

<style scoped>

</style>
