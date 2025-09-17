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
const foto = ref(null)
const arquivoFoto = ref(null)

const selecionarFoto = (event) => {
  const file = event.target.files[0]
  if (file) {
    arquivoFoto.value = file
    foto.value = URL.createObjectURL(file)
    console.log('Foto selecionada:', file)
  }
}

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

async function registrarSetor() {
  try {

    //FAZ O UPLOAD DA FOTO E PEGA A KEY
    if (arquivoFoto.value) {
      const attachmentKey = await uploadImagem.upload(arquivoFoto.value)
      userStore.usuario.foto_attachment_key = attachmentKey
    }

    await userStore.registrarUsuario(userStore.usuario)
    console.log('Setor cadastrado com sucesso')
    await userStore.login(userStore.usuario.email, userStore.usuario.password)
    emit('next')
  } catch (error) {
    console.error('Erro ao registrar setor:', error)
  }
}
</script>

<template>
<section class="flex flex-col justify-center items-center mt-10 mb-20">
     <img src="/public/LogoIFC.png" alt="logo" class="w-40rem h-20rem mb-4" />
       <h1 class="text-4xl font-bold text-center mb-20">Entre na nossa comunidade.</h1>
       <form action="#" class="relative bg-[#FEFEFE] px-40 pb-10 pt-10">
       <div class="flex flex-col items-center">
        <label
          class="cursor-pointer relative"
          :title="foto ? 'Mudar foto' : 'Adicionar uma foto (opcional)'"
        >
          <input type="file" accept="image/*" @change="selecionarFoto" class="hidden mb-5" />

          <img
            :src="foto || 'https://www.gravatar.com/avatar/?d=mp'"
            alt="Foto de perfil"
            class="w-30 h-30 rounded-full"
          />

          <span
            class="mdi mdi-camera absolute bg-white rounded-full px-2 py-0.5 top-22 right-0 text-2xl text-[#9ACCAC]"
          ></span>
        </label>
      </div>
      <div class="mb-5 mt-8">
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
              <div class="mb-5">
          <label for="text" class="block text-lg font-medium mb-2"
            >Nome <span class="mdi mdi-account-edit"></span
          ></label>
          <input
            type="text"
            id="text"
            placeholder="Digite o nome do setor"
            class="py-2 px-3 border border-[#A7A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#386641] transition-all duration-200 w-full"
            v-model="userStore.usuario.nome"
          />
        </div>
        <div class="mb-5">
          <label for="text" class="block text-lg font-medium mb-2"
            >Sigla <span class="mdi mdi-label-variant-outline"></span
          ></label>
          <input
            type="text"
            id="text"
            placeholder="Digite a sigla do setor"
            class="py-2 px-3 border border-[#A7A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#386641] transition-all duration-200 w-full"
            v-model="userStore.usuario.sigla"
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
            :class="verSenha ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
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
                > {{ req.requisito }} </span>
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
            :class="verConfirmarSenha ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
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
        @click="registrarSetor()"
        :disabled="!userStore.usuario.email || !userStore.usuario.sigla || !userStore.usuario.nome || !userStore.usuario.password"
        class="mt-5"
      />
      </form>
      <BtnVoltarComponent class="absolute top-250 left-0" @click="router.push('/Cadastro/Aluno')" />
</section>
</template>