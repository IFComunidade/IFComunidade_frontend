<script setup>
import OcorrenciaInfoComponent from '@/components/OcorrenciaInfoComponent.vue'
import { useOcorrenciaStore } from '@/stores/ocorrenciaStore'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const ocorrenciaStore = useOcorrenciaStore()

onMounted(async () => {

  const ocorrenciaId = route.params.id
  if(ocorrenciaId) {
    await ocorrenciaStore.getOcorrenciaById(ocorrenciaId)
  } else {
    console.error('ID não encontrado')
  }
})
</script>

<template>
  <section class="px-22 flex flex-col justify-start min-h-screen">
    <RouterLink to="/ListagemOcorrencia">
      <div class="flex gap-6 mt-20 mb-15">
        <span class="mdi mdi-arrow-left text-3xl font-bold text-[#386641]"></span>
        <h1 class="text-[#386641] text-3xl font-bold">
          {{ ocorrenciaStore.ocorrenciaSelecionada.titulo }}
        </h1>
      </div>
    </RouterLink>

    <div class="flex">
      <OcorrenciaInfoComponent :ocorrencia="ocorrenciaStore.ocorrenciaSelecionada" />

      <div class="ml-25">
        <div class="border-b-1 border-[#386641]">
          <div class="flex">
            <img :src=" ocorrenciaStore.ocorrenciaSelecionada.usuario?.foto || 'https://www.gravatar.com/avatar/?d=mp'" class="rounded-full w-10 h-10" />
            <div class="ml-3">
              <p class="text-2xl">{{ ocorrenciaStore.ocorrenciaSelecionada.usuario?.nome }}</p>
              <p class="text-xs text-[#A7A7A7] mb-4">
                {{ ocorrenciaStore.ocorrenciaSelecionada.usuario?.username || 'sem username' }}
              </p>
            </div>
          </div>
          <p class="max-w-200 mb-3">{{ ocorrenciaStore.ocorrenciaSelecionada.texto }}</p>
          <img
            v-if="ocorrenciaStore.ocorrenciaSelecionada.imagem"
            :src="ocorrenciaStore.ocorrenciaSelecionada.imagem?.url"
            alt="imagem"
            class="w-180 mb-3"
          />
        </div>

        <div class="border-b-1 border-[#386641] mt-20">
          <div class="flex">
            <img src="https://www.gravatar.com/avatar/?d=mp" class="rounded-full w-10 h-10" />
            <div class="ml-3">
              <p class="text-2xl">Coordenação de Curso</p>
              <p class="text-xs text-[#A7A7A7] mb-4">17/05/2025 - 13:36</p>
            </div>
          </div>
          <p class="max-w-200 mb-3">
            Olá, Maria. Agradecemos pelo seu feedback e entendemos sua insatisfação. Estamos
            trabalhando para melhorar a comunicação e garantir maior estabilidade no planejamento
            das aulas. Você poderia nos contar se alguma dessas mudanças impactou diretamente em sua
            rotina?
          </p>
        </div>
        <div class="border-b-1 border-[#386641] mt-20">
          <input type="text" placeholder="Responder" class="text-xl w-185 focus: outline-none" />
          <span class="mdi mdi-send text-[#A7A7A7] cursor-pointer" @click="enviar"></span>
        </div>
      </div>
    </div>
  </section>
</template>
