<script setup>
import { useUserStore } from '@/stores/userStore';
import { computed, onMounted, ref } from 'vue';

const userStore = useUserStore();
const busca = ref('');
const emit = defineEmits(['selecionar']);

const todosSetores = computed(() => {
  return userStore.users.filter(user => user.tipo === 2);
})

const mostrarSetores = ref(false);

const esconderSugestoes = () => {
  setTimeout(() => {
    mostrarSetores.value = false;
  }, 150);
};

const setoresFiltrados = computed(() => {
  return todosSetores.value.filter(s => s.nome.toLowerCase().includes(busca.value.toLowerCase()));
})

const setorSelecionado = (setor) =>{
  busca.value = setor.nome;
  mostrarSetores.value = false;
  emit('selecionar', setor.id)
}


const selecionarEnter = () => {
  if(mostrarSetores.value && setoresFiltrados.value.length > 0) {
    setorSelecionado(setoresFiltrados.value[0])
  }
}

onMounted(() => {
  userStore.getAllUsers();
});

</script>

<template>
  <div class="relative flex items-center gap-3">
    <label for="setor" class="font-semibold text-2xl">Setor destinado: </label>
    <input
      type="text"
      id="setor"
      v-model="busca"
      placeholder="Digite o nome do setor"
      @keyup.enter="selecionarEnter"
      @focus="mostrarSetores = true"
      @blur="esconderSugestoes"
      class="w-130 text-lg border-b-2 border-[#A7A7A7] focus:outline-none focus:border-[#386641] transition-all duration-200"
      >
  </div>

   <div v-if="mostrarSetores && setoresFiltrados.length > 0">
      <ul class="absolute bg-white border rounded border-[#386641] w-100 left-105 top-220 shadow-lg">
        <li
          v-for="setor in setoresFiltrados"
          :key="setor.id"
          @mousedown="setorSelecionado(setor)"
          class="cursor-pointer p-2 text-medium hover:bg-[#DEFFEA] hover:text-[#386641] transition-all duration-200 flex items-center"
        >
          <img src="https://www.gravatar.com/avatar/?d=mp" alt="" class="rounded-full w-10 h-10 mr-4"> {{ setor.nome }}
        </li>
      </ul>
    </div>

    <div v-if="mostrarSetores && setoresFiltrados.length <= 0">
      <p class="p-2 absolute bg-white border text-red-500 rounded border-[#386641] w-100 left-105 top-220 shadow-lg">Setor não encontrado.</p>
    </div>

</template>
