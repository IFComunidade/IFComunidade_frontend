<script setup>
import { computed, onMounted, ref } from 'vue'
import { useOcorrenciaStore } from '@/stores/ocorrenciaStore'
import SelectStatusComponent from './SelectStatusComponent.vue'
import router from '@/router'

const ocorrenciaStore = useOcorrenciaStore()
const busca = ref('')

const ocoRecebidas = computed(() => {
  return ocorrenciaStore.ocorrencias
    .filter((o) => o.status === 1)
    .filter((o) => o.titulo.toLowerCase().includes(busca.value.toLowerCase()))
})

const ocoAnalises = computed(() => {
  return ocorrenciaStore.ocorrencias
    .filter((o) => o.status === 2)
    .filter((o) => o.titulo.toLowerCase().includes(busca.value.toLowerCase()))
})

const ocoConcluidas = computed(() => {
  return ocorrenciaStore.ocorrencias
    .filter((o) => o.status === 3 || o.status === 4)
    .filter((o) => o.titulo.toLowerCase().includes(busca.value.toLowerCase()))
})

const abaSelecionada = ref('recebidos')

function detalhesOcorrencia(id) {
  ocorrenciaStore.getOcorrenciaById(id)
  router.push({ name: 'Ocorrencia', params: { id } })
}

onMounted(() => {
  ocorrenciaStore.getOcorrencias()
})
</script>

<template>
  <div
    v-if="ocorrenciaStore.isLoading"
    class="flex justify-center items-center flex-1 min-h-screen"
  >
    <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#386641]"></div>
  </div>

  <section v-else class="px-22 flex flex-col justify-start min-h-screen">
    <div class="flex gap-6 mt-20 mb-15">
      <span class="mdi mdi-arrow-left text-3xl font-bold text-[#386641]"></span>
      <RouterLink to="/">
        <h1 class="text-[#386641] text-3xl font-bold">Ouvidoria</h1>
      </RouterLink>
    </div>

    <div class="flex items-center border-b-2 border-[#386641]">
      <SelectStatusComponent
        @clickRecebidos="abaSelecionada = 'recebidos'"
        @clickAnalise="abaSelecionada = 'analise'"
        @clickConcluido="abaSelecionada = 'concluido'"
      />

      <div class="flex gap-3 bg-[#F1F1F1] px-2 py-1 items-center">
        <label for="pesquisa">
          <span class="mdi mdi-magnify text-[#A6A6A6] text-lg"></span>
        </label>
        <input
          type="text"
          id="pesquisa"
          placeholder="Buscar ocorrência"
          v-model="busca"
          class="flex-1 outline-none bg-transparent"
        />
      </div>
    </div>

    <!--OCORRENCIAS RECEBIDAS-->

    <div v-if="abaSelecionada === 'recebidos' && ocoRecebidas.length > 0">
      <table class="mt-5 min-w-full rounded-md bg-inherit text-inherit">
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
            :ocorrenciaId="recebido.id"
            @click="detalhesOcorrencia(recebido.id)"
            class="hover:bg-[#DEFFEA] transition-all duration-200 cursor-pointer"
          >
            <td class="py-4 px-4">
              <p class="text-xl">{{ recebido.titulo }}</p>
              <div class="text-sm text-gray-500">
                <div class="text-sm text-gray-500">
                  {{ recebido.usuario.username || 'sem username' }}
                </div>
              </div>
            </td>
            <td class="py-4 px-4">
              <span class="bg-[#E6F0EC] text-[#2E5939] text-sm px-3 py-1 rounded-full font-medium">
                {{ recebido.tipo_display }}
              </span>
            </td>
            <td class="py-4 px-4">{{ recebido.categoria_display }}</td>
            <td class="py-4 px-4">
              <span>{{ recebido.data }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-else-if="abaSelecionada === 'recebidos' && ocoRecebidas.length <= 0"
      class="flex flex-col justify-center items-center"
      style="height: 80vh"
    >
      <span class="mdi mdi-alert-circle-outline text-red-500 text-2xl"></span>
      <h4 class="text-gray-500 font-medium text-xl">Nenhuma ocorrência encontrada</h4>
    </div>

    <!--OCORRÊNCIAS EM ANÁLISE-->

    <div v-if="abaSelecionada === 'analise' && ocoAnalises.length > 0">
      <table class="mt-5 min-w-full rounded-md bg-inherit text-inherit">
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
            v-for="analise in ocoAnalises"
            :key="analise.id"
            @click="detalhesOcorrencia(analise.id)"
            class="hover:bg-[#DEFFEA] transition-all duration-200 cursor-pointer"
          >
            <td class="py-4 px-4">
              <p class="text-xl">{{ analise.titulo }}</p>
              <div class="text-sm text-gray-500">
                <div class="text-sm text-gray-500">
                  {{ analise.usuario.username || 'sem username' }}
                </div>
              </div>
            </td>
            <td class="py-4 px-4">
              <span class="bg-[#E6F0EC] text-[#2E5939] text-sm px-3 py-1 rounded-full font-medium">
                {{ analise.tipo_display }}
              </span>
            </td>
            <td class="py-4 px-4">{{ analise.categoria_display }}</td>
            <td class="py-4 px-4">
              <span>{{ analise.data }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-else-if="abaSelecionada === 'analise' && ocoAnalises.length <= 0"
      class="flex flex-col justify-center items-center"
      style="height: 80vh"
    >
      <span class="mdi mdi-alert-circle-outline text-red-500 text-2xl"></span>
      <h4 class="text-gray-500 font-medium text-xl">Nenhuma ocorrência encontrada</h4>
    </div>

    <!--OCORRÊNCIAS CONCLUÍDAS-->

    <div v-if="abaSelecionada === 'concluido' && ocoConcluidas.length > 0">
      <table class="mt-5 min-w-full rounded-md bg-inherit text-inherit">
        <thead class="text-left">
          <tr class="text-[#386641]">
            <th class="py-3 px-4 font-bold">Título</th>
            <th class="py-3 px-4 font-bold">Tipo Ocorrência</th>
            <th class="py-3 px-4 font-bold">Categoria</th>
            <th class="py-3 px-4 font-bold">Data</th>
            <th class="py-3 px-4 font-bold">Status</th>
          </tr>
        </thead>
        <tbody class="text-inherit">
          <tr
            v-for="concluido in ocoConcluidas"
            :key="concluido.id"
            @click="detalhesOcorrencia(concluido.id)"
            class="hover:bg-[#DEFFEA] transition-all duration-200 cursor-pointer"
          >
            <td class="py-4 px-4">
              <p class="text-xl">{{ concluido.titulo }}</p>
              <div class="text-sm text-gray-500">
                <div class="text-sm text-gray-500">
                  {{ concluido.usuario.username || 'sem username' }}
                </div>
              </div>
            </td>
            <td class="py-4 px-4">
              <span class="bg-[#E6F0EC] text-[#2E5939] text-sm px-3 py-1 rounded-full font-medium">
                {{ concluido.tipo_display }}
              </span>
            </td>
            <td class="py-4 px-4">{{ concluido.categoria_display }}</td>
            <td class="py-4 px-4">
              <span>{{ concluido.data }}</span>
            </td>
            <td class="py-4 px-4">
              <span v-if="concluido.status === 3">Resolvido</span>
              <span v-if="concluido.status === 4">Não resolvido</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-else-if="abaSelecionada === 'concluido' && ocoConcluidas.length <= 0"
      class="flex flex-col justify-center items-center"
      style="height: 80vh"
    >
      <span class="mdi mdi-alert-circle-outline text-red-500 text-2xl"></span>
      <h4 class="text-gray-500 font-medium text-xl">Nenhuma ocorrência encontrada</h4>
    </div>
  </section>
</template>
