<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router' 


const userStore = useUserStore();
const showPassword = ref(false);
const email = ref('');
const senha = ref('');
const router = useRouter();
const senhaIncorreta = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value
}

// function goHome() {
  // window.location.href = '/'
// }

async function login() {
  senhaIncorreta.value = false
  try {
    await userStore.login(email.value, senha.value)
    alert('Login feito')
    router.push('/')
  } catch (error) {
    console.error(error)

    const status = error?.response?.status || error?.status || null
    if(status === 401) {
      senhaIncorreta.value = true
    }
    else {
      alert('Erro ao fazer login')
    }
  }
}

</script>

<template>
  <section class="mt-10">
    <img src="/LogoIFC.png" alt="logo" class="mb-4 mx-auto">
    <h1 class="text-4xl font-bold text-center">Bem-vindo de volta</h1>

    <form  @submit.prevent="login()" class="bg-[#FEFEFE] pt-10 pb-13 mt-12 rounded-lg max-w-2xl mx-auto flex flex-col justify-center items-center">
          
      <div>
        <label for="email" class="mb-2">Email <span class="mdi mdi-email-outline"></span></label>
        <input
            v-model="email"
            type="email"
            name="email"
            id="email"
            placeholder="exemplo@gmail.com"
            class="border border-gray-400 rounded py-3 px-3 w-full placeholder-gray-500"
          />
      </div>
          
          <div class="relative w-full">
            <label for="senha" class="mb-2 w-full">Senha <span class="mdi mdi-lock-outline"></span></label>
            <input
              v-model="senha"
              :type="showPassword ? 'text' : 'password'"
              name="senha"
              placeholder="Digite sua senha"
              id="senha"
              class="border border-gray-400 rounded py-3 pr-10 pl-3 w-full placeholder-gray-500"
            />
            <span
              @click="togglePassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 text-xl"
            >
              <span :class="showPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></span>
            </span>
          </div>
          <p v-if="senhaIncorreta">
            senha incorreta
          </p>

        <button
        type="submit"
        class="cursor-pointer w-full bg-[#386641] font-bold text-[#FFFCF7] py-3 border rounded transition-transform duration-200 hover:scale-105 mt-8"
      >
        Continuar <span class="mdi mdi-arrow-right"></span>
      </button>


    </form>

     <div class="w-full max-w-2xl mx-auto mt-8 flex justify-start">
    <button
      class="px-10 py-2 text-[#386641] rounded border border-[#386641] font-bold transition-transform duration-200 hover:scale-105 cursor-pointer"
    >
      <span class="mdi mdi-arrow-left"></span> Voltar
    </button>
  </div>
  </section>
</template>

<style scoped>
</style>
