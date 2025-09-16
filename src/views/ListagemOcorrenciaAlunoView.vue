<script setup>
import { ref } from 'vue';
const pesquisa = ref('');
</script>
<template>
  <section class="px-22 flex flex-col justify-start min-h-screen">
    <div class="flex gap-6 mt-20 mb-15">
      <span class="mdi mdi-arrow-left text-3xl font-bold text-[#386641]"></span>
      <h1 class="text-[#386641] text-3xl font-bold">Suas Ocorrências</h1>
    </div>
    <RouterLink to="/RegistrarOcorrencia">
      <button type="button" class="mb-2 px-6 py-1 bg-[#386641] rounded font-bold text-[#FFFCF7] transition-transform duration-200 hover:scale-105">
        Registrar
      </button>
    </RouterLink>
       <div>
              <input type="text" v-model="pesquisa" placeholder="Pesquisar" class="bg-[#F1F1F1] text-sm placeholder:text-xs py-1 px-2 rounded border border-gray-300 focus:outline-none focus:ring-0" />
       </div>
  </section>
</template>
