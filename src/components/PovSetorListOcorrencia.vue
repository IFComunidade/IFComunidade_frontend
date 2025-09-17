<script setup>
import { computed, ref } from 'vue';
import { useOcorrenciaStore } from '@/stores/ocorrenciaStore';
import SelectStatusComponent from './SelectStatusComponent.vue';

const ocorrenciaStore = useOcorrenciaStore();

const ocoRecebidas = computed(() => {
 return ocorrenciaStore.ocorrencias.filter(o => o.status === 1)
});

const ocoAnalises = computed(() => {
 return ocorrenciaStore.ocorrencias.filter(o => o.status === 2)
});

const ocoConcluidas = computed(() => {
  return ocorrenciaStore.ocorrencias.filter(o => o.status === 3)
});

const abaSelecionada = ref('recebidos')

</script>

<template>



  <section class="px-22 flex flex-col justify-start min-h-screen">

    <div class="flex gap-6 mt-20 mb-15">
      <span class="mdi mdi-arrow-left text-3xl font-bold text-[#386641]"></span>
      <h1 class="text-[#386641] text-3xl font-bold">Ouvidoria</h1>
    </div>

    <SelectStatusComponent
      @clickRecebidos = "abaSelecionada = 'recebidos'"
      @clickAnalise = "abaSelecionada = 'analise'"
      @clickConcluido = "abaSelecionada = 'concluido'"
    />


    <div v-if="abaSelecionada === 'recebidos'">

      <table class="mt-5 min-w-full rounded-md  bg-inherit text-inherit">
        <thead class="text-left">
          <tr class="text-[#386641]">
            <th class="py-3 px-4 font-bold">Título</th>
            <th class="py-3 px-4 font-bold">Tipo Ocorrência</th>
            <th class="py-3 px-4 font-bold">Categoria</th>
            <th class="py-3 px-4 font-bold">Data</th>
          </tr>
        </thead>
        <tbody class="text-inherit">
          <tr
            v-for="recebido in ocoRecebidas"
            :key="recebido.id"
            class="hover:bg-[#DEFFEA] transition-all duration-200 cursor-pointer"
          >
            <td class="py-4 px-4">
              <p class="text-xl">{{ recebido.titulo }}</p>
              <div class="text-sm text-gray-500">
                {{ recebido.usuario.username || '@usuario' }}
              </div>
            </td>
            <td class="py-4 px-4">
              <span class="bg-[#E6F0EC] text-[#2E5939] text-sm px-3 py-1 rounded-full font-medium">
                {{ recebido.tipo_display }}
              </span>
            </td>
            <td class="py-4 px-4">{{ recebido.categoria_display }}</td>
            <td class="py-4 px-4 flex items-center gap-2">
              <span>{{ recebido.data }}</span>
            </td>
          </tr>
        </tbody>
      </table>

    </div>

  </section>


</template>
