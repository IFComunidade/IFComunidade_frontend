<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/userStore';

const foto = ref(null);
const arquivoFoto = ref(null);
const userStore = useUserStore();

const novoEmail = ref('');
const novoNome = ref('');
const novoUsername = ref('');

const selecionarFoto = (event) => {
  const file = event.target.files[0]
  if (file) {
    arquivoFoto.value = file
    foto.value = URL.createObjectURL(file)
  }
}

async function editarPerfil () {
  try {
    userStore.usuario.email = novoEmail.value;
    userStore.usuario.nome = novoNome.value;
    userStore.usuario.username = novoUsername.value;
    await userStore.editarPerfil(userStore.usuario.id);
  }
  catch (error) {
      console.error('erro ao atualizar seu perfil', error);
      throw error;
    }
}

watch(
  () => userStore.usuario,
  (usuario) => {
    if (usuario) {
      novoEmail.value = usuario.email
      novoNome.value = usuario.nome
      novoUsername.value = usuario.username
    }
  },
  { immediate: true }
)
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
    <div class="flex flex-col mt-3 border-b border-[#386641] items-center justify-center text-[1.2rem]">
    <p class="text-[#386641] font-bold">{{ userStore.usuario.nome }}</p>
    <p class="text-[#736C6C] mb-5">{{ userStore.usuario.username }}</p>
    </div>
    <div class="flex justify-center">
    <form action="#" class="max-w-2xl w-full" >
      <div class="mb-5 mt-8 relative">
          <label for="text" class="block text-lg font-medium mb-2 text-[#386641]"
            >Username <span class="mdi mdi-account text-[#386641]"></span
          ></label>
          <input
            type="text"
            id="username"
            placeholder="exemplo@gmail.com"
            class="py-2 px-3 border border-[#A7A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#386641] transition-all duration-200 w-full"
            v-model="novoUsername" 
          />
          <span class="mdi mdi-pencil-outline right-3 mt-2 absolute text-[#736C6C] text-xl"></span>
        </div>
      <div class="mb-5 mt-8 relative">
          <label for="email" class="block text-lg font-medium mb-2 text-[#386641]"
            >E-mail <span class="mdi mdi-email-outline text-[#386641]"></span
          ></label>
          <input
            type="email"
            id="email"
            placeholder="exemplo@gmail.com"
            class="py-2 px-3 border border-[#A7A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#386641] transition-all duration-200 w-full"
            v-model="novoEmail" 
          />
          <span class="mdi mdi-pencil-outline right-3 mt-2 absolute text-[#736C6C] text-xl"></span>
        </div>
        <div class="mb-5 mt-8 relative">
          <label for="text" class="block text-lg font-medium mb-2 text-[#386641]"
            >Nome <span class="mdi mdi-smart-card-outline text-[#386641]"></span
          ></label>
          <input
            type="text"
            id="nome"
            placeholder="Digite seu nome"
            class="py-2 px-3 border border-[#A7A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#386641] transition-all duration-200 w-full"
            v-model="novoNome" 
          />
          <span class="mdi mdi-pencil-outline right-3 mt-2 absolute text-[#736C6C] text-xl"></span>
        </div>
        <div class="mb-5 mt-8">
          <label for="text" class="block text-lg font-medium mb-2 text-[#386641]"
            >CPF <span class="mdi mdi-calendar-blank-outline text-[#386641]"></span
          ></label>
          <input
            type="text"
            id="cpf"
            class="py-2 px-3 border border-[#A7A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#386641] transition-all duration-200 w-full"
            v-model="userStore.usuario.cpf" 
            disabled
          />
        </div>
        <div class="mb-5 mt-8">
          <label for="text" class="block text-lg font-medium mb-2 text-[#386641]"
            >Matrícula <span class="mdi mdi-card-account-details-outline text-[#386641]"></span
          ></label>
          <input
            type="text"
            id="matricula"
            class="py-2 px-3 border border-[#A7A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#386641] transition-all duration-200 w-full"
            v-model="userStore.usuario.matricula" 
            disabled
          />
        </div>
    </form>
    </div>
    <button class="flex justify-center gap-1 items-center bg-[#386641] text-white mb-5 p-2 rounded cursor-pointer font-bold transition-all duration-500 hover:scale-103 hover:bg-[#29452E] hover:gap-3 hover:shadow-lg px-10" @click="editarPerfil()">
      Salvar
    </button>
</section>
</template>