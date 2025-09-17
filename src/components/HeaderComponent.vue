<script setup>
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import LoginComponent from './LoginComponent.vue'
import BotaoCadastroComponent from './BotaoCadastroComponent.vue'

const route = useRoute()
const userStore = useUserStore()

const activeColor = (path) => (route.path === path ? 'color: #141414' : 'color: #A7A7A7')
</script>

<template>
  <header class="mt-5 px-22">
    <div class="flex items-center justify-between">
      <div>
        <RouterLink to="/">
          <img src="/LogoIFC.png" alt="logo" />
        </RouterLink>
      </div>
      <div class="flex">
        <nav>
          <ul class="flex gap-10 justify-center text-center">
            <li class="">
              <RouterLink
                to="/"
                :style="activeColor('/')"
                class="inline-block transition-transform duration-200 hover:scale-105"
              >
                Início
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/MURALinterliga"
                :style="activeColor('/MURALinterliga')"
                class="inline-block transition-transform duration-200 hover:scale-105"
              >
                MURALinterliga
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/ListagemOcorrencia"
                :style="activeColor('/ListagemOcorrencia')"
                class="inline-block transition-transform duration-200 hover:scale-105"
              >
                Ocorrências
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
      <div v-if="!userStore.isLoggedIn">
        <ul class="flex gap-5">
          <li class="">
            <RouterLink to="/Cadastro/Aluno">
              <BotaoCadastroComponent />
            </RouterLink>
          </li>
          <li class="">
            <RouterLink to="/Login">
              <LoginComponent />
            </RouterLink>
          </li>
        </ul>
      </div>
      <div v-else class="flex items-center gap-4">
        <img
          :src="userStore.usuario.foto?.url || 'https://www.gravatar.com/avatar/?d=mp'"
          alt="Foto de perfil"
          class="w-10 h-10 rounded-full object-cover mr-4"
        />
        <span>{{ userStore.usuario.nome }}</span>
        <button @click="userStore.logout()">Sair</button>
      </div>
    </div>
  </header>
</template>
