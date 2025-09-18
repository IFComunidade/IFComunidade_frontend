<script setup>
import { onMounted } from 'vue'
import { useOcorrenciaStore } from '@/stores/ocorrenciaStore'
import { useTramiteStore } from '@/stores/tramiteStore'
import { useUserStore } from '@/stores/userStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const ocorrenciaStore = useOcorrenciaStore()
const tramiteStore = useTramiteStore()
const userStore = useUserStore()

onMounted(() => {
  const ocorrenciaId = route.params.id
  if (ocorrenciaId) {
    tramiteStore.getTramitesByOcorrencia(ocorrenciaId)
  }
})

async function postarResposta() {
  if (ocorrenciaStore.ocorrenciaSelecionada.id && userStore.usuario.id && tramiteStore.tramite.resposta) {
    tramiteStore.tramite.ocorrencia = ocorrenciaStore.ocorrenciaSelecionada.id
    tramiteStore.tramite.autor = userStore.usuario.id
    await tramiteStore.addTramite(tramiteStore.tramite) 
  } else {
    console.error('Dados de ocorrência, usuário ou resposta indisponíveis para postar.')
  }
}
</script>

<template>
  <div v-if="tramiteStore.tramites && tramiteStore.tramites.length > 0">
    <div v-for="respostas in tramiteStore.tramites" :key="respostas.id" class="mt-15">
      <div class="flex">
        <img
          :src="respostas.autor?.foto?.url || 'https://www.gravatar.com/avatar/?d=mp'"
          class="rounded-full w-10 h-10"
        />
        <div class="ml-3">
          <p class="text-2xl">{{ respostas.autor?.nome }}</p>
          <p class="text-xs text-[#A7A7A7] mb-4">
            {{ respostas.data }}
          </p>
        </div>
      </div>
      <p class="max-w-200 pb-5 mb-3 border-b-2 border-[#AFD0BF]">{{ respostas.resposta }}</p>
    </div>
  </div>
  <div class="border-b-1 border-[#386641] mt-20">
    <input
      type="text"
      placeholder="Responder"
      class="text-xl w-185 focus: outline-none"
      v-model="tramiteStore.tramite.resposta"
    />
    <span class="mdi mdi-send text-[#A7A7A7] cursor-pointer" @click="postarResposta()"></span>
  </div>
</template>