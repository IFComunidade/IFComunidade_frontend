<script setup>
import { onMounted } from 'vue'
import { useOcorrenciaStore } from '@/stores/ocorrenciaStore';
// import { usePostagemStore } from '@/stores/postagemStore';

const ocorrenciaStore = useOcorrenciaStore();

onMounted(() => {
  ocorrenciaStore.getOcorrencias();
});


</script>
<template>
  <h1>Listagem de ocorrencias:</h1>
  <ul>
    <li v-for="ocorrencia in ocorrenciaStore.ocorrencias" :key="ocorrencia.id">
      <h2>{{ ocorrencia.titulo }}</h2>
      <p>{{ocorrencia.texto}}</p>
      <p>{{ocorrencia.status}}</p>
      <p>{{ ocorrencia.usuario }}</p>
    </li>
  </ul>
  <br><br><br>



</template>
