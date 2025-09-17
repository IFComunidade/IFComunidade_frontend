<script setup>
import { ref } from 'vue';
function click(){
alert("clicou")
}
const pesquisa = ref('');
</script>

<template>
  <section class="px-22 flex flex-col justify-start min-h-screen">

    <div class="flex gap-6 mt-20 mb-15">
      <span class="mdi mdi-arrow-left text-3xl font-bold text-[#386641]"></span>
      <h1 class="text-[#386641] text-3xl font-bold">Suas Ocorrências</h1>
    </div>


    <div class="flex justify-between items-center mb-4">
      <RouterLink to="/RegistrarOcorrencia">
        <button
          type="button"
          class="px-6 py-1 bg-[#386641] rounded font-bold text-[#FFFCF7] cursor-pointer transition-all duration-500 hover:scale-103 hover:bg-[#29452E] hover:gap-3 hover:shadow-lg"
        >
          Registrar
        </button>
      </RouterLink>

      <div class="relative flex-grow max-w-[300px]">
        <span class="mdi mdi-magnify absolute top-2 left-43 text-gray-500"></span>
        <input
          type="text"
          v-model="pesquisa"
          placeholder="Buscar Ocorrência"
          class="bg-[#F1F1F1] text-sm placeholder:text-xs py-2 focus:outline-none focus:ring-0 pl-6"
        />
      </div>
    </div>


    <div class="overflow-x-auto mt-8">
      <table class="min-w-full rounded-md shadow-sm bg-inherit text-inherit">
        <thead class="text-left border-b-2 border-gray-200">
          <tr class="text-[#386641]">
            <th class="py-3 px-4 font-bold">Título</th>
            <th class="py-3 px-4 font-bold">Tipo Ocorrência</th>
            <th class="py-3 px-4 font-bold">Categoria</th>
            <th class="py-3 px-4 font-bold">Status</th>
            <th class="py-3 px-4 font-bold"></th>
          </tr>
        </thead>
        <tbody class="text-inherit">

          <tr @click="click()">
            <td class="py-4 px-4">
              <p class="text-xl">Insatisfação relacionada ao planejamento acadêmico</p>
              <div class="text-sm text-gray-500">@pontofrio</div>
            </td>
            <td class="py-4 px-4">
              <span class="bg-[#E6F0EC] text-[#2E5939] text-sm px-3 py-1 rounded-full font-medium">
                Queixa
              </span>
            </td>
            <td class="py-4 px-4">Planejamento Acadêmico</td>
            <td class="py-4 px-4">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-[#2E5939]"></div>
                <span>Entregue</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

