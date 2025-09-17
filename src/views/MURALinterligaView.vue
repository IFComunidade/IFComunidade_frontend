<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePostagemStore } from '@/stores/postagemStore';
import { useUserStore } from '@/stores/userStore';
import { RouterLink } from 'vue-router';

const postagemStore = usePostagemStore();
const userStore = useUserStore();

onMounted(() => {
  postagemStore.getPostagens();
});
onMounted(() => {
  userStore.getAllUsers();
});
const setores = computed(() => {
  return userStore.users.filter(user => user.tipo == 2);
});

const mostrarFiltro = ref(false);
const filtrosSelecionados = ref([]);
const filtrosSelecionadosTemp = ref([]);
const pesquisa = ref('');

const limparFiltros = () => {
  filtrosSelecionadosTemp.value = [];
  filtrosSelecionados.value = [];
  pesquisa.value = '';
};

const aplicarFiltros = () => {
  filtrosSelecionados.value = [...filtrosSelecionadosTemp.value];
  mostrarFiltro.value = false;
};

const filtrosFiltrados = computed(() => {
  if (!pesquisa.value) return setores.value;
  return setores.value.filter(filtro =>
    filtro.nome.toLowerCase().includes(pesquisa.value.toLowerCase())
  );
});

const postagensFiltradas = computed(() => {
  if (filtrosSelecionados.value.length === 0) {
    return postagemStore.postagens;
  }
  return postagemStore.postagens.filter(postagem =>
    filtrosSelecionados.value.some(filtro => filtro.id === postagem.usuario)
  );
});
</script>

<template>
  <section class="relative mt-15 pb-40">
    <div class="flex justify-center">
      <h1 class="inline-block text-3xl font-bold text-[#141414] leading-normal border-b-2 border-[#386641] pb-2">
        Explore o MURALinterliga!
      </h1>
    </div>

    <div class="flex justify-between container mx-auto px-5 mt-10">
      <div v-if="userStore.usuario.tipo == 2">
        <router-link to="/Criar/Postagem">
        <button type="button"
          class="px-7 py-1 bg-[#386641] rounded font-bold text-[#FFFCF7] transition-transform duration-200 hover:scale-105" >
          Criar +
        </button>
        </router-link>

      </div>

      <div class="relative hover:underline cursor-pointer">
        <button class="flex items-center" @click="mostrarFiltro = !mostrarFiltro">
          <span class="mr-1 text-xl font-semibold">Filtrar Posts</span>
          <span class="text-xl font-semibold">
            <img src="/filtrar.png" alt="filtrar" />
          </span>
        </button>

        <div v-show="mostrarFiltro" class="absolute bg-[#FFFCF7] rounded-lg shadow-[0_0_15px_0_rgba(0,0,0,0.5)] p-4"
          style="width: 260px; top: 100%; right: 0; z-index: 10;">
          <div class="flex justify-between items-center border-b border-[#736C6C] pb-2 mb-2">
            <p class="text-xl font-semibold text-[#141414]">Filtros</p>
            <button class="text-xs text-[#736C6C] hover:underline cursor-pointer" @click="limparFiltros">
              X Limpar filtros <span v-if="filtrosSelecionadosTemp.length > 0">({{ filtrosSelecionadosTemp.length
                }})</span>
            </button>
          </div>

          <div class="relative w-full mb-2">
            <img src="/pesquisa.png" alt="pesquisa"
              class="absolute top-1/2 left-2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
            <input type="text" v-model="pesquisa" placeholder="Pesquisar"
              class="w-full bg-[#F1F1F1] text-sm placeholder:text-xs py-2 px-6 rounded border border-gray-300 focus:outline-none focus:ring-0" />
          </div>

          <div class="space-y-2 max-h-48 overflow-y-auto mb-3">
            <label v-for="filtro in filtrosFiltrados" :key="filtro" class="flex items-center space-x-2">
              <input type="checkbox" :value="filtro" v-model="filtrosSelecionadosTemp" class="accent-[#386641]" />
              <span class="text-sm">{{ filtro.nome }}</span>
            </label>
          </div>

          <button @click="aplicarFiltros"
            class="w-full mt-1 py-2 px-4 bg-[#386641] text-[#FFFCF7] text-sm font-semibold rounded hover:bg-[#2f5233] transition-colors"
            style="letter-spacing: 0.1rem;">
            APLICAR
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Verificando se está carregando -->
  <section class="flex flex-col justify-center items-center gap-12">
    <div v-if="postagemStore.isLoading">
      <p>Carregando postagens</p>
    </div>

    <!--Postagens carregadas-->
    <div v-else class="max-w-3xl mx-auto p-6">
      <ul>
        <li v-for="postagem in postagensFiltradas" :key="postagem.id" class="border-b-1 border-[#386641] mb-6 pb-6">
          <div class="flex justify-between w-28">
            <img src="https://www.gravatar.com/avatar/?d=mp" alt="perfilfoto" class="rounded-full w-10 h-10">
            <h3 class="mt-3 font-bold">Pessoa</h3>
          </div>
          <h2 class="ml-3 mt-8 font-bold text-2xl">{{ postagem.titulo }}</h2>
          <p class="mt-10 mb-10">{{ postagem.descricao }}</p>
          <img v-if="postagem.imagem" :src="postagem.imagem.url" alt="Imagem de Postagem"
            class="mx-auto mt-6 mb-6 max-w-full h-auto rounded-lg" />
          <p class="mb-20 mt-10">
            Publicado em:
            {{ postagem.data ? new Date(postagem.data).toLocaleDateString() : 'Data inválida' }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
