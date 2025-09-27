
<script setup>
import { useUserStore } from '@/stores/userStore';
import PovAlunoListOcorrencia from '@/components/PovAlunoListOcorrencia.vue';
import PovSetorListOcorrencia from '@/components/PovSetorListOcorrencia.vue';

const userStore = useUserStore();

</script>

<template>

  <div v-if="!userStore.isLoggedIn" class="flex flex-col gap-5 justify-center items-center min-h-screen">
      <span class="mdi mdi-alert-circle-outline text-2xl"></span>
      <h4 class="text-2xl text-gray-600">É necessário ter login para acessar essa página</h4>
  </div>

  <div v-else>
      <PovAlunoListOcorrencia
        v-if="userStore.usuario.tipo === 1"
      />

      <PovSetorListOcorrencia
        v-if="userStore.usuario.tipo === 2"
      />
  </div>


</template>
