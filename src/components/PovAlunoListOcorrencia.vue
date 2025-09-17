<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useOcorrenciaStore } from '@/stores/ocorrenciaStore'

const ocorrenciaStore = useOcorrenciaStore()

onMounted(() => {
  ocorrenciaStore.getOcorrencias()
  console.log(ocorrenciaStore.ocorrencias)
})

</script>

<template>
  <section class="px-22 flex flex-col justify-start min-h-screen">
    <div class="flex gap-6 mt-20 mb-15">
      <span class="mdi mdi-arrow-left text-3xl font-bold text-[#386641]"></span>
      <RouterLink to="/">
        <h1 class="text-[#386641] text-3xl font-bold">Suas Ocorrências</h1>
      </RouterLink>
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
          </tr>
        </thead>
        <tbody class="text-inherit">
          <tr
            v-for="ocorrencia in ocorrenciaStore.ocorrencias"
            class="hover:bg-[#DEFFEA] transition-all duration-200 cursor-pointer"
            :key="ocorrencia.id"
          >
            <td class="py-4 px-4">
              <p class="text-xl">{{ ocorrencia.titulo }}</p>
              <div class="text-sm text-gray-500">
                {{ ocorrencia.usuario.username || '@usuario' }}
              </div>
            </td>
            <td class="py-4 px-4">
              <span class="bg-[#E6F0EC] text-[#2E5939] text-sm px-3 py-1 rounded-full font-medium">
                {{ ocorrencia.tipo_display }}
              </span>
            </td>
            <td class="py-4 px-4">{{ ocorrencia.categoria_display }}</td>
            <td class="py-4 px-4 flex items-center gap-2">
              <span v-if="ocorrencia.status === 1" class="mdi mdi-email-outline"></span>
              <span
                v-else-if="ocorrencia.status === 2"
                class="mdi mdi-email-fast-outline text-xl"
              ></span>
              <span v-else-if="ocorrencia.status === 3" class="mdi mdi-email-check-outline"></span>
              <span>{{ ocorrencia.status_display }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
