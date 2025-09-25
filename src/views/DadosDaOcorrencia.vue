<script setup>
import AreaRespostaComponent from '@/components/AreaRespostaComponent.vue'
import OcorrenciaInfoComponent from '@/components/OcorrenciaInfoComponent.vue'
import { useOcorrenciaStore } from '@/stores/ocorrenciaStore'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const ocorrenciaStore = useOcorrenciaStore()

onMounted(async () => {
  const ocorrenciaId = route.params.id
  if (ocorrenciaId) {
    await ocorrenciaStore.getOcorrenciaById(ocorrenciaId)
  } else {
    console.error('ID não encontrado')
  }
})
</script>

<template>
  <section v-if="ocorrenciaStore.isLoading" class="flex justify-center items-center h-screen">
    <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#386641] border-t-transparent"></div>
  </section>

  <section v-else class="px-22 flex flex-col justify-start min-h-screen">
    <RouterLink to="/ListagemOcorrencia">
      <div class="flex gap-6 mt-20 mb-15">
        <span class="mdi mdi-arrow-left text-3xl font-bold text-[#386641]"></span>
        <h1 class="text-[#386641] text-3xl font-bold">
          {{ ocorrenciaStore.ocorrenciaSelecionada?.titulo }}
        </h1>
      </div>
    </RouterLink>

    <div class="flex" v-if="ocorrenciaStore.ocorrenciaSelecionada">
      <OcorrenciaInfoComponent :ocorrencia="ocorrenciaStore.ocorrenciaSelecionada" />

      <div class="ml-25">
        <div class="flex">
          <img
            :src="
              ocorrenciaStore.ocorrenciaSelecionada?.usuario?.foto ||
              'https://www.gravatar.com/avatar/?d=mp'
            "
            class="rounded-full w-10 h-10"
          />
          <div class="ml-3">
            <p class="text-2xl">{{ ocorrenciaStore.ocorrenciaSelecionada?.usuario?.nome }}</p>
            <p class="text-xs text-[#A7A7A7] mb-4">
              {{ ocorrenciaStore.ocorrenciaSelecionada?.usuario?.username || 'sem username' }}
            </p>
          </div>
        </div>
        <p class="max-w-200 pb-5 mb-3 border-b-2 border-[#AFD0BF]">
          {{ ocorrenciaStore.ocorrenciaSelecionada?.texto }}
        </p>
        <img
          v-if="ocorrenciaStore.ocorrenciaSelecionada?.imagem"
          :src="ocorrenciaStore.ocorrenciaSelecionada.imagem?.url"
          alt="imagem"
          class="w-180 mb-3"
        />
        <AreaRespostaComponent />
      </div>
    </div>
  </section>
</template>
