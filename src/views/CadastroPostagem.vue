<script setup>
import router from '@/router'
import { usePostagemStore } from '@/stores/postagemStore'
import { useUserStore } from '@/stores/userStore';

const postagemStore = usePostagemStore();
const userStore = useUserStore();

  let dataAtual = new Date();
  let ano = dataAtual.getFullYear();
  let mes = dataAtual.getMonth();
  let dia = dataAtual.getDate();
  let dataCompleta = `${dia}-${mes}-${ano}`;

function goBack() {
  router.push('/MURALinterliga');
}


async function publishPost(){
  postagemStore.postagem.data = dataCompleta;
  postagemStore.postagem.usuario = userStore.usuario.id;
  console.log(postagemStore.postagem)

  try{

    await postagemStore.addPostagem(postagemStore.postagem)
    console.log(postagemStore.postagem)
    router.push('/MURALinterliga')
  } catch (error){
    console.error('Erro ao fazer postagem', error)
    throw error
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#fefcf7] p-6 md:p-12 text-[#1a3b2f]">
    <div class="flex items-center space-x-2 mb-6">
      <button @click="goBack" class="text-2xl">
        <span class="mdi mdi-arrow-left text-[#1a3b2f]"></span>
      </button>
      <h1 class="text-2xl font-semibold text-[#386641]">Criar Postagem</h1>
    </div>

    <form @submit.prevent="publishPost()" class="space-y-6 max-w-xl">
      <div>
        <label class="block font-semibold mb-1">Título da postagem:</label>
        <input
          v-model="postagemStore.postagem.titulo"
          type="text"
          placeholder="Digite aqui o título da postagem"
          class="w-full border-b border-gray-300 focus:outline-none focus:border-[#1a3b2f] py-2 px-1 bg-transparent placeholder-gray-400"
        />
      </div>

      <div>
        <label class="block font-semibold mb-1">Descrição da postagem:</label>
        <textarea
          v-model="postagemStore.postagem.descricao"
          rows="6"
          class="w-full border border-[#1a3b2f] rounded-md p-3 bg-transparent focus:outline-none"
        ></textarea>
      </div>

      <div class="flex items-center space-x-2 text-sm text-gray-600">
        <span class="mdi mdi-paperclip"></span>
        <span>Inserir anexo.</span>
      </div>

      <div class="flex space-x-4 mt-4">
        <button
          type="button"
          @click="resetForm"
          class="border border-[#1a3b2f] text-[#1a3b2f] px-4 py-2 rounded hover:bg-gray-100"
        >
          LIMPAR
        </button>
        <button
          type="submit"
          class="bg-[#1a3b2f] text-white px-4 py-2 rounded hover:bg-[#154e3b]"
        >
          PUBLICAR
        </button>
      </div>
    </form>
  </div>
</template>

