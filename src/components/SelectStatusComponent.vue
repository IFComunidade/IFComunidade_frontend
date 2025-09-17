<script setup>
import { ref } from 'vue';
const emits = defineEmits(['clickRecebidos', 'clickAnalise', 'clickConcluido']);

const opcaoSelecionada = ref('recebidos')

const selecionarOpcao = (opcao) => {
  opcaoSelecionada.value = opcao
  if(opcao === 'recebidos') emits('clickRecebidos')
  if(opcao === 'analise') emits('clickAnalise')
  if(opcao === 'concluidos') emits('clickConcluido')
}

</script>

<template>
  <ul class="flex gap-40 border-b-2 border-[#386641] w-full">
    <li @click="selecionarOpcao('recebidos')"  :class="['flex gap-2 text-xl font-medium cursor-pointer pb-2', opcaoSelecionada === 'recebidos' ? 'border-b-3 border-[#386641]' : '']"
    >
      <span class="mdi mdi-email-outline"></span>
      <h3>Recebidos</h3>
    </li>
    <li @click="selecionarOpcao('analise')" :class="['flex gap-2 text-xl font-medium cursor-pointer pb-2', opcaoSelecionada === 'analise' ? 'border-b-3 border-[#386641]' : '']">
      <span class="mdi mdi-email-fast-outline text-2xl"></span>
      <h3>Em análise</h3>
    </li>
    <li @click="selecionarOpcao('concluidos')" :class="['flex gap-2 text-xl font-medium cursor-pointer pb-2', opcaoSelecionada === 'concluidos' ? 'border-b-3 border-[#386641]' : '']">
      <span class="mdi mdi-email-check-outline"></span>
      <h3>Concluídos</h3>
    </li>
  </ul>
</template>
