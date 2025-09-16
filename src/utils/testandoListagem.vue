<script setup>
import { onMounted } from 'vue'
import { useOcorrenciaStore } from '@/stores/ocorrenciaStore';
import { useRouter } from 'vue-router';
// import { usePostagemStore } from '@/stores/postagemStore';

const ocorrenciaStore = useOcorrenciaStore();
const router = useRouter();

onMounted(() => {
  ocorrenciaStore.getOcorrencias();
});

function abrirDetalhes(id) {
  ocorrenciaStore.getOcorrenciaById(id);
  router.push({ name: 'testandoListagemId', params: { id } });
}

</script>
<template>
  <div>
    <h1>Listagem de ocorrencias:</h1>
    <ul>
      <li v-for="ocorrencia in ocorrenciaStore.ocorrencias" :key="ocorrencia.id" class="border p-4 mb-4" @click="abrirDetalhes(ocorrencia.id)" style="cursor: pointer;">
        <h2>{{ ocorrencia.titulo }}</h2>
        <p>{{ ocorrencia.texto }}</p>
        <p>{{ ocorrencia.status }}</p>
      </li>
    </ul>
  </div>
</template>
