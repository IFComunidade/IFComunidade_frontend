<script setup>
import { ref } from 'vue';

const emit = defineEmits(['selecionar'])

const mostrarOpcoes = ref(false);

const opcoes = ref([
  { value: 1, texto: 'Denúncia' },
  { value: 2, texto: 'Sugestão' },
  { value: 3, texto: 'Queixa' },
]);

const opcaoSelecionada = ref({value: null, texto: 'Selecionar'});

const mudarVisibilidadeOpcoes = () => {
  mostrarOpcoes.value = !mostrarOpcoes.value
}


const mudarOpcao = (option) => {
  if(option.value === null) return
  opcaoSelecionada.value = option
  mostrarOpcoes.value = false
  emit('selecionar', option.value)
}


</script>

<template>

  <div class="relative w-45">

      <div
        class="border border-[#386641] px-2 py-1 font-medium rounded cursor-pointer flex justify-between items-center"
        @click="mudarVisibilidadeOpcoes"
        >
        <p>{{ opcaoSelecionada.texto }}</p>
        <span
          :class="mostrarOpcoes ? 'mdi mdi-menu-up' : 'mdi mdi-menu-down'"
          class="text-xl"
          ></span>

      </div>
      <div v-if="mostrarOpcoes">
        <ul class="absolute bg-white z-100 border rounded border-[#386641] w-full top-12 shadow-lg">
          <li
            v-for="opcao in opcoes"
            :key="opcao.value"
            class="cursor-pointer p-2 text-medium hover:bg-[#DEFFEA] hover:text-[#386641] transition-all duration-200"
            @click="mudarOpcao(opcao)"
            >
            {{ opcao.texto }}
          </li>
        </ul>

      </div>

  </div>
</template>
