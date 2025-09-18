<script setup>
  defineProps(['id']);
  import { onMounted } from 'vue'
  import { useOcorrenciaStore } from '@/stores/ocorrenciaStore';

  const ocorrenciaStore = useOcorrenciaStore();

  onMounted(() => {
    ocorrenciaStore.ocorrenciaSelecionada;
  });

</script>

<template>
  <div>
    <h1>Detalhes da Ocorrência</h1>
    <p>ID da Ocorrência: {{ ocorrenciaStore.ocorrenciaSelecionada.titulo }}</p>
  </div>
</template>
