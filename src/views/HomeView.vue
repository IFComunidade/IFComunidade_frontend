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
      <img src="/bannerImg.png" alt="banner" class="w-[550px] mx-auto object-contain -mt-40">
      <h2 class="relative text-[1.6875rem] font-bold text-[#141414] w-fit mx-auto after:content-[''] after:block after:mt-5 after:mx-auto after:w-[70%] after:h-[1px] after:bg-[#386641]">Bem-vindo(a) ao IFComunidade</h2>
      <p class="text-center max-w-5xl mx-auto mt-4 px-4 text-[1.15rem] mt-5 text-[#736C6C]">Somos a rede de ouvidoria, informação e comunicação do IFC Campus Araquari.<br>Aqui, você pode acompanhar notícias, registrar denúncias, dar sugestões e se conectar com a comunidade acadêmica de forma acolhedora e segura.
      <br><span class="text-[#386641] font-extrabold">
        <RouterLink to="/Cadastro">
            Cadastre-se,
        </RouterLink>
      </span>
      <span class="font-extrabold">participe e contribua com a construção de uma comunidade mais consciente e conectada!</span>
    </p>
    <div class="grid place-items-center">
        <ul class="flex mt-26 space-x-80">
            <li class="flex flex-col items-center">
                <img src="/megafone.png" alt="megafone" class="mb-2 w-16 h-16 object-contain">
                <h3 class="text-[1.3rem] font-bold mt-3">Comunique-se</h3>
                <p class="mt-4 max-w-[190px] text-center">Registre seu feedback e faça a diferença!</p>
            </li>
            <li class="flex flex-col items-center">
                <img src="/dados.png" alt="iconededados" class="mb-2 w-16 h-16 object-contain">
                <h3 class="text-[1.3rem] font-bold mt-3">Faça Parte</h3>
                <p class="mt-4 max-w-[230px] text-center">Participe de votações e construa decisões coletivas.</p>
            </li>
            <li class="flex flex-col items-center">
                <img src="/balao.png" alt="balaodeconversa" class="mb-2 w-16 h-16 object-contain">
                 <h3 class="text-[1.3rem] font-bold mt-3">Compartilhe</h3>
                <p class="mt-4 max-w-[160px] text-center">Conte sua experiência e eternize momentos.</p>
            </li>
        </ul>
    </div>
    </section>
</template>

<style scoped>

</style>