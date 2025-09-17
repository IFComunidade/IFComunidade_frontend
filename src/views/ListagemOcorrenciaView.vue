<script setup>
import { useUserStore } from '@/stores/userStore';
import PovAlunoListOcorrencia from '@/components/PovAlunoListOcorrencia.vue';
import PovSetorListOcorrencia from '@/components/PovSetorListOcorrencia.vue';

const userStore = useUserStore();

</script>

<template>

  <PovAlunoListOcorrencia
    v-if="userStore.usuario.tipo === 1"
  />

  <PovSetorListOcorrencia
    v-if="userStore.usuario.tipo === 2"
  />


</template>
