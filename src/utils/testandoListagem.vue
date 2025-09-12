<script setup>
import { onMounted, ref } from 'vue'
import { useOcorrenciaStore } from '@/stores/ocorrenciaStore';
// import { usePostagemStore } from '@/stores/postagemStore';

const ocorrenciaStore = useOcorrenciaStore();
const ocorrenciaSelecionada = useOcorrenciaStore();
const idOcorrencia = ref();

onMounted(() => {
  ocorrenciaStore.getOcorrencias();
});
onMounted(() => {
  ocorrenciaSelecionada.getOcorrenciaById(idOcorrencia.value);
});

const Boleano = ref(true);

/*mudarBeSlavarID(o) {
  Boleano.value = false;
  idOcorrencia.value = o.id;
}*/

</script>
<template>
  <div v-if="Boleano == true">
    <h1>Listagem de ocorrencias:</h1>
    <ul>
      <li v-for="ocorrencia in ocorrenciaStore.ocorrencias" :key="ocorrencia.id">
        <h2 @click="idOcorrencia.value = ocorrencia.id">{{ ocorrencia.titulo }}</h2>
        <p>{{ ocorrencia.texto }}</p>
        <p>{{ ocorrencia.status }}</p>
      </li>
    </ul>
    <button @click="Boleano = false">Ver detalhes</button>
  </div>
  <div v-else>
    <div v-for="item in ocorrenciaSelecionada.ocorrencias" :key="item.id">
      <h2>{{ item.titulo }}</h2>
    </div>
    <button @click="Boleano = true">Voltar</button>
  </div>
</template>
