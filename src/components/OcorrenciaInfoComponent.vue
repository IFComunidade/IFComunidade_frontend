<script setup>
import { defineProps } from 'vue';
import { useUserStore } from '@/stores/userStore'
import { useOcorrenciaStore } from '@/stores/ocorrenciaStore';
import AreaControleComponent from './AreaControleComponent.vue';

const userStore = useUserStore();
const ocorrenciaStore = useOcorrenciaStore()

defineProps({
  ocorrencia: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex-col">
    <ul>
      <li>
        <p class="text-[#A7A7A7] text-xl mb-2">Data de registro</p>
        <p class="text-xl font-semibold mb-4">{{ ocorrencia.data }}</p>
      </li>
      <li>
        <p class="text-[#A7A7A7] text-xl mb-2">Tipo de Ocorrência</p>
        <p class="text-xl font-semibold mb-4">{{ ocorrencia.tipo_display }}</p>
      </li>
      <li>
        <p class="text-[#A7A7A7] text-xl mb-2">Categoria</p>
        <p class="text-xl font-semibold mb-4">{{ ocorrencia.categoria_display }}</p>
      </li>
      <li>
        <p class="text-[#A7A7A7] text-xl mb-2">Status</p>
        <p class="text-xl font-semibold mb-4">{{ ocorrencia.status_display }}</p>
      </li>
    </ul>

    <AreaControleComponent
      v-if="userStore.usuario.tipo === 2"
      :ocorrenciaId="ocorrencia.id"
      @mudar-status="
        async ({ id, status }) => {
          const oco = ocorrenciaStore.ocorrencias.find((o) => o.id === id)
          if (oco) {
            oco.status = status
          }

          try {
            await ocorrenciaStore.attParcialmenteOcorrencia(id, { status })
          } catch (error) {
            console.error('Erro ao atualizar', error)
          }
        }
      "
    />
  </div>
</template>
