<script setup>
  defineProps(['id']);
  import { onMounted } from 'vue'
  import { useOcorrenciaStore } from '@/stores/ocorrenciaStore';
  import { useTramiteStore } from '@/stores/tramiteStore';
  import { useUserStore } from '@/stores/userStore'

  const ocorrenciaStore = useOcorrenciaStore();
  const tramiteStore = useTramiteStore();
  const userStore = useUserStore();

  onMounted(() => {
    tramiteStore.getTramites();
  });


  let dataAtual = new Date();
  let ano = dataAtual.getFullYear();
  let mes = dataAtual.getMonth() + 1;
  let dia = dataAtual.getDate();
  let dataCompleta = `${dia}-${mes}-${ano}`;

  async function postarResposta() {
    tramiteStore.tramite.data = dataCompleta;
    tramiteStore.tramite.autor = userStore.usuario.id;
    tramiteStore.tramite.ocorrencia = ocorrenciaStore.ocorrenciaSelecionada.id;

    await tramiteStore.addTramite(tramiteStore.tramite)
    console.log(tramiteStore.tramite)
  }
</script>
<template>
  <div class="border">
    <h1>Detalhes da Ocorrência</h1>
    <p>ID da Ocorrência: {{ ocorrenciaStore.ocorrenciaSelecionada.titulo }}</p>
  </div>
  <div>
    <p v-for="tramite in tramiteStore.tramites" :key="tramite.id">{{ tramite.resposta }}</p>
  </div>
  <div>
    <label for="resposta">Resposta:</label>
    <input type="text" id="resposta" v-model="tramiteStore.tramite.resposta">
  </div>
  <button @click="postarResposta()" >Enviar</button>
</template>
