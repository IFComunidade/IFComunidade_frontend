<script setup>
import { ref } from 'vue'
import uploadImagem from '@/services/uploadImagem'
import { useUserStore } from '@/stores/userStore';

const foto = ref(null);
const arquivoFoto = ref(null);
const userStore = useUserStore();

const selecionarFoto = (event) => {
  const file = event.target.files[0]
  if (file) {
    arquivoFoto.value = file
    foto.value = URL.createObjectURL(file)
  }
}

</script>

<template>
<section class="px-22">
    <div class="flex gap-6 mt-20 mb-15">
      <span class="mdi mdi-arrow-left text-3xl font-bold text-[#386641]"></span>
      <h1 class="text-[#386641] text-3xl font-bold">
        <RouterLink to="/"> Seu perfil </RouterLink>
      </h1>
    </div>
    <div class="flex flex-col items-center">
      <label class="cursor-pointer relative" :title="foto ? 'Mudar foto' : 'Adicionar uma foto (opcional)'">
        <input type="file" accept="image/*" @change="selecionarFoto" class="hidden mb-5" />
        <img :src="foto || 'https://www.gravatar.com/avatar/?d=mp'" alt="Foto de perfil" class="w-30 h-30 rounded-full"/>
        <span class="mdi mdi-camera absolute bg-white rounded-full px-2 py-0.5 top-22 right-0 text-2xl text-[#9ACCAC]"></span>
      </label>
    </div>
    <div class="flex mt-3 border-b border-[#386641]">
    <p>{{ userStore.usuario.nome }}</p>
    <p class="mt-3 mb-16">{{ userStore.usuario.username }}</p>
    </div>
    <form action="#" class="flex flex-col">
    <div class="mb-5">
        <label for="text">
            Username <span class=""></span>
        </label>
    </div>
    </form>
</section>
</template>