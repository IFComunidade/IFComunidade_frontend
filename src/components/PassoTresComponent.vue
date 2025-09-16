<script setup>
import { computed,watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import AlunosCadastrados from '@/utils/matriculas';
import BtnContinuarComponent from './BtnContinuarComponent.vue';
import BtnVoltarComponent from './BtnVoltarComponent.vue';

const userStore = useUserStore();

const alunoSelecionado = computed(() => {
  return AlunosCadastrados.find(aluno => aluno.matricula === userStore.usuario.matricula)
})

watch(alunoSelecionado, (novoAluno) => {
  if (novoAluno) {
    userStore.usuario.nome = novoAluno.nome;
    userStore.usuario.curso = novoAluno.curso.id;
    userStore.usuario.cpf = novoAluno.cpf;
  }
}, { immediate: true });

const emit = defineEmits(['next', 'prev']);

function emitNext() {
  emit('next');
}
</script>

<template>
  <section
    class="flex flex-col justify-center items-center text-center mt-5 min-h-screen"
  >
    <img src="/public/LogoIFC.png" alt="logo" class="w-40rem h-20rem mb-6" />
    <h1 class="text-4xl font-bold text-center mb-8">Confirme seus dados.</h1>

  <div class="relative flex flex-col bg-white px-40 py-20 rounded-xl w-1/2" @keydown.enter="emitNext" tabindex="0">

    <h2 class="text-3xl font-bold mb-5">Essa pessoa é você?</h2>

    <ul>
      <li class="text-left mb-4">
        <p class="text-[#A7A7A7] text-base font-medium mb-2">Nome <span class="mdi mdi-smart-card-outline"></span></p>
        <h4 class="text-2xl font-medium">{{ alunoSelecionado.nome }}</h4>
      </li>
      <li class="text-left mb-4">
        <p class="text-[#A7A7A7] text-base font-medium mb-2">Curso <span class="mdi mdi-google-classroom"></span></p>
        <h4 class="text-2xl font-medium">{{ alunoSelecionado.curso.nome }}</h4>
      </li>
      <li class="text-left mb-4">
        <p class="text-[#A7A7A7] text-base font-medium mb-2">CPF <span class="mdi mdi-id-card"></span></p>
        <h4 class="text-2xl font-medium">{{ alunoSelecionado.cpf }}</h4>
      </li>
      <li class="text-left mb-4">
        <p class="text-[#A7A7A7] text-base font-medium mb-2">Matrícula <span class="mdi mdi-card-account-details-outline"></span></p>
        <h4 class="text-2xl font-medium">{{ alunoSelecionado.matricula }}</h4>
      </li>
    </ul>

    <BtnContinuarComponent 
    @click="emit('next')"
    class="mt-5"
    />

    <BtnVoltarComponent 
    @click="emit('prev')"
    class="top-160 left-0"
    />

  </div>

  </section>
</template>
