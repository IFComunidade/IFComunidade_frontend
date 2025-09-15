<script setup>
import  AlunosCadastrados  from '@/utils/matriculas';
import { useUserStore } from '@/stores/userStore';
import { ref, watch } from 'vue';
import BtnContinuarComponent from './BtnContinuarComponent.vue';
import BtnVoltarComponent from './BtnVoltarComponent.vue';

const userStore = useUserStore();
const matricula = ref('');
const emit = defineEmits(['next', 'prev']);

function validarMatricula() {
  if(AlunosCadastrados.some(aluno => aluno.matricula === matricula.value)) {
    return true;
  }
  return false;
}


watch(matricula, (novaMatricula) => {
  userStore.usuario.matricula = novaMatricula;
});

function emitNext() {
  if(validarMatricula()) {
    emit('next');
  }
}

</script>

<template>
  <section class="flex flex-col justify-center items-center text-center min-h-screen">
    <img src="/LogoIFC.png" alt="logo" class="w-40rem h-20rem mb-4" />
    <h1 class="text-4xl font-bold text-center mb-20">Verifique sua matrícula.</h1>
    <div class="relative flex flex-col justify-center bg-white px-40 py-20 rounded-xl" @keydown.enter="emitNext" tabindex="0">
      <h2 class="text-2xl font-bold mb-5"> <span class="mdi mdi-lock-open-check-outline"></span> Digite sua matrícula.</h2>
      <input
      type="text"
      v-model="matricula"
      placeholder="2000123456"
      class="py-2 px-3 border border-[#A7A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#386641] transition-all duration-200 w-full"
      />

      <p v-if="matricula && !validarMatricula()"  class="text-left text-red-600 text-base mt-1 font-medium"> <span class="mdi mdi-alert-circle"></span> Matrícula inválida.</p>

      <BtnContinuarComponent
      @click="emit('next')"
      :disabled="!validarMatricula()"
      class="mt-5"
      />

      <BtnVoltarComponent
      @click="emitNext()"
      class="top-90 left-0"
      />

    </div>
  </section>
</template>
