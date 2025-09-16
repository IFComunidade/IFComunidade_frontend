<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const email = ref('')
const senha = ref('')
const showPassword = ref(false)
const senhaIncorreta = ref(false)

function togglePassword() {
  showPassword.value = !showPassword.value
}

async function login() {
  // reseta flag de erro
  senhaIncorreta.value = false

  try {
    // chama o login da store (supondo que retorne uma Promise)
    const result = await userStore.login(email.value, senha.value)
    console.log('Login sucesso ->', result)

    // navega para home sem recarregar a página
    await router.push('/')
  } catch (error) {
    console.error('Erro do login:', error)

    // tenta identificar status (axios, fetch, etc.)
    const status = error?.response?.status || error?.status || null

    if (status === 401) {
      // credenciais incorretas
      senhaIncorreta.value = true
    } else {
      // erro genérico (pode ser rede, servidor, etc.)
      // mostramos a mensagem de senha incorreta por compatibilidade com seu layout
      // ou você pode mostrar um alert com detalhes
      console.warn('Erro inesperado no login, status:', status)
      senhaIncorreta.value = true
    }
  }
}
</script>

<template>
  <section class="mt-20">
    <img src="/LogoIFC.png" alt="logo" class="mb-4 mx-auto" />
    <h1 class="text-4xl font-bold text-center">Bem-vindo de volta</h1>

    <!-- fundo maior (wrapper) -->
    <div class="bg-[#FEFEFE] mx-auto max-w-[600px] rounded flex justify-center mt-12">
      <!-- form interno mantém a mesma largura visual -->
      <form @submit.prevent="login()" class="pb-15 mt-12 mt-15 rounded-lg max-w-[300px] mx-auto flex flex-col gap-3 w-full">
        <div class="w-full">
          <label for="email" class="mb-1 block">Email <span class="mdi mdi-email-outline"></span></label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="exemplo@gmail.com"
            class="border border-gray-400 rounded py-2 px-3 w-full placeholder-gray-500"
          />
        </div>

        <div class="relative w-full">
          <label for="senha" class="mb-1 block">Senha <span class="mdi mdi-lock-outline"></span></label>
          <input
            v-model="senha"
            :type="showPassword ? 'text' : 'password'"
            id="senha"
            placeholder="Digite sua senha"
            class="border border-gray-400 rounded py-2 px-3 pr-10 w-full placeholder-gray-500"
          />
          <span
            @click="togglePassword"
            class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 text-xl mt-3"
          >
            <span :class="showPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></span>
          </span>
        </div>

        <!-- mensagem de erro corrigida -->
        <p v-if="senhaIncorreta" class="text-red-600 text-sm mt-1 mb-2 w-full text-left flex items-center gap-2">
          <span class="mdi mdi-alert-circle-outline"></span>
          Senha incorreta!
        </p>

        <button
          type="submit"
          class="w-full bg-[#386641] text-white font-bold py-2 rounded transition-transform duration-200 hover:scale-105 mt-2 cursor-pointer"
        >
          Continuar <span class="mdi mdi-arrow-right"></span>
        </button>
      </form>
    </div>

    <!-- voltar alinhado à esquerda do fundo branco -->
    <div class="w-full max-w-[600px] mx-auto mt-6 flex justify-start">
      <button
        class="px-6 py-2 text-[#386641] rounded border border-[#386641] font-bold transition-transform duration-200 hover:scale-105 cursor-pointer"
        @click="$router.back()"
      >
        <span class="mdi mdi-arrow-left"></span> Voltar
      </button>
    </div>
  </section>
</template>

<style scoped>
/* nada especial aqui */
</style>
