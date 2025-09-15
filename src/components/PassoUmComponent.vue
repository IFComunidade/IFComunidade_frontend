<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import router from '@/router'
import { useUserStore } from '@/stores/userStore'
import BtnVoltarComponent from '@/components/BtnVoltarComponent.vue'
import BtnContinuarComponent from '@/components/BtnContinuarComponent.vue'

const verSenha = ref(false)
const verConfirmarSenha = ref(false)
const userStore = useUserStore()
const validarSenha = ref('')
const focusSenha = ref(false)

const requisitosSenha = computed(() => {
  return [
    { requisito: 'Mínimo de 8 caracteres', valido: userStore.usuario.password.length >= 8 },
    { requisito: 'Ao menos um número', valido: /\d/.test(userStore.usuario.password) },
  ]
})

const emit = defineEmits(['next'])

function mudarVisibilidadeSenha() {
  verSenha.value = !verSenha.value
}
function mudarVisibilidadeConfSenha() {
  verConfirmarSenha.value = !verConfirmarSenha.value
}

function emitNext() {
  if (
    userStore.usuario.email &&
    userStore.usuario.password &&
    validarSenha.value === userStore.usuario.password
  ) {
    emit('next')
  }
}
</script>

<template>
  <section class="flex flex-col justify-center items-center mt-10 mb-5 min-h-screen">
    <img src="/public/LogoIFC.png" alt="logo" class="w-40rem h-20rem mb-4" />
    <h1 class="text-4xl font-bold text-center mb-20">Entre na nossa comunidade.</h1>

    <div class="relative bg-white px-40 py-10 rounded-xl" @keydown.enter="emitNext()" tabindex="0">
      <form action="#" class="flex flex-col">
        <div class="mb-5">
          <label for="email" class="block text-lg font-medium mb-2"
            >Email <span class="mdi mdi-email-outline"></span
          ></label>
          <input
            type="email"
            id="email"
            placeholder="exemplo@gmail.com"
            class="py-2 px-3 border border-[#A7A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#386641] transition-all duration-200 w-full"
            v-model="userStore.usuario.email"
          />
        </div>

        <div class="relative mb-5">
          <label for="senha" class="block text-lg font-medium mb-2"
            >Senha <span class="mdi mdi-lock-outline"></span
          ></label>
          <input
            class="py-2 px-3 border border-[#A7A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#386641] transition-all duration-200 w-full"
            :type="verSenha ? 'text' : 'password'"
            id="senha"
            placeholder="Digite sua senha"
            v-model="userStore.usuario.password"
            @focus="focusSenha = true"
            @blur="focusSenha = false"
          />
          <span
            @click="mudarVisibilidadeSenha()"
            :class="verSenha ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"
            class="absolute right-4 top-11 cursor-pointer text-[#386641] cursor-pointer text-lg"
            :title="verSenha ? 'Ocultar senha' : 'Mostrar senha'"
          ></span>

          <ul v-if="focusSenha">
            <li
              v-for="req in requisitosSenha"
              :key="req.requisito"
              class="text-sm mt-1 font-medium"
            >
              <p>
                <span
                  class="mdi"
                  :class="
                    req.valido ? 'text-green-600 mdi-check-circle' : 'text-red-600 mdi-close-circle'
                  "
                ></span>
                {{ req.requisito }}
              </p>
            </li>
          </ul>
        </div>

        <div class="relative mb-5">
          <label for="confirmarSenha" class="block text-lg font-medium mb-2"
            >Confirme sua senha</label
          >

          <input
            v-model="validarSenha"
            :type="verConfirmarSenha ? 'text' : 'password'"
            id="confirmarSenha"
            placeholder="Confirme sua senha"
            class="py-2 px-3 border border-[#A7A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#386641] transition-all duration-200 w-full"
          />

          <span
            @click="mudarVisibilidadeConfSenha()"
            :class="verConfirmarSenha ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"
            class="absolute right-4 top-11 cursor-pointer text-[#386641] cursor-pointer text-lg"
            :title="verConfirmarSenha ? 'Ocultar senha' : 'Mostrar senha'"
          ></span>

          <p
            v-if="validarSenha && validarSenha !== userStore.usuario.password"
            class="text-red-600 text-base mt-1 font-medium"
          >
            <span class="mdi mdi-alert-circle"></span> As senhas não coincidem
          </p>
        </div>

        <BtnContinuarComponent
          @click="emitNext()"
          :disabled="
            !userStore.usuario.email ||
            !userStore.usuario.password ||
            validarSenha !== userStore.usuario.password
          "
        />

        <p class="text-[#736C6C]">
          Faz parte de um setor?
          <RouterLink
            to="/Cadastro/Setor"
            class="text-[#2D88D4] underline hover:text-[#176FB8] transition-all duration-200"
            >Clique aqui.</RouterLink
          >
        </p>
        <p class="text-[#2D88D4] underline hover:text-[#176FB8] transition-all duration-200">
          <RouterLink to="/Login">Já possuo uma conta.</RouterLink>
        </p>
      </form>

      <BtnVoltarComponent class="top-130 left-0" @click="router.push('/')" />
    </div>

    <div class="relative w-100 h-auto left-[20em] bottom-[22em]">
      <img src="/public/mobile-login.png" alt="mobile" class="absolute" />
    </div>
  </section>
</template>
