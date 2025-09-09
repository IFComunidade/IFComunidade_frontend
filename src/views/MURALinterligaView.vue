<script setup>
import { ref } from 'vue';
const mostrarFiltro = ref(false);
</script>

<template>
<section class="relative mt-15 pb-40">
  <div class="flex justify-center">
    <h1 class="inline-block text-3xl font-bold text-[#141414] leading-normal border-b-2 border-[#386641] pb-2">
      Explore o MURALinterliga!
    </h1>
  </div>

  <div class="flex justify-between container mx-auto px-5 mt-10">
    <div>
        <button type="button" class="px-7 py-1 bg-[#386641] rounded font-bold text-[#FFFCF7] transition-transform duration-200 hover:scale-105" >
        Criar +
    </button>
    </div>
    <div class="relative">
       <button class="flex" @click="mostrarFiltro = !mostrarFiltro">
    <span class="mr-1 text-xl font-semibold mb-2">Filtrar Posts</span>
    <span class="text-xl font-semibold mt-1">
        <img src="/filtrar.png" alt="filtrar">
    </span>
</button>

        <div v-show="mostrarFiltro" class=" absolute p- bg-white rounded-lg shadow-[0_0_15px_0_rgba(0,0,0,0.5)] bg-[FFFCF7]">
            <div class="flex border-b-1 border-[#736C6C]">
                <p class="text-xl font-semibold mr-4">Filtros</p>
                <p class="text-xs mt-1.5 ">X Limpar filtros</p>
            </div>
            <ul>
                <li>
                    uuuuu
                </li>
                <li>
                    aaaaa
                </li>
            </ul>
        </div>
    </div>
  </div>
</section>

</template>