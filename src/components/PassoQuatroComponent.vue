<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import BtnContinuarComponent from './BtnContinuarComponent.vue'
import BtnVoltarComponent from './BtnVoltarComponent.vue'
import uploadImagem from '@/services/uploadImagem'

const userStore = useUserStore()
const foto = ref(null)
const erroMatricula = ref('')
const arquivoFoto = ref(null)

const selecionarFoto = (event) => {
  const file = event.target.files[0]
  if (file) {
    arquivoFoto.value = file
    foto.value = URL.createObjectURL(file)
    console.log('Foto selecionada:', file)
  }
}

async function registrarAluno() {
  try {
    erroMatricula.value = ''

    if (arquivoFoto.value) {
      const attachmentKey = await uploadImagem.upload(arquivoFoto.value)
      userStore.usuario.foto_attachment_key = attachmentKey
    }

    await userStore.registrarUsuario(userStore.usuario)
    console.log('Aluno cadastrado com sucesso')
    await userStore.login(userStore.usuario.email, userStore.usuario.password)
    emit('next')
  } catch (error) {
    if (error.response && error.response.data) {
      const data = error.response.data
      if (data.matricula) {
        erroMatricula.value = data.matricula.join(', ')
      }
    }
    console.error('Erro ao registrar aluno:', error)
  }
}

const emit = defineEmits(['next', 'prev'])
</script>

<template>
  <section class="flex flex-col justify-center items-center text-center min-h-screen">
    <img src="/LogoIFC.png" alt="logo" class="mb-4" />
    <h1 class="text-4xl font-bold text-center mb-15">Informações finais.</h1>

    <div
      class="relative flex flex-col justify-center bg-white px-40 py-10 rounded-xl"
      @keydown.enter="registrarAluno"
      tabindex="0"
    >
      <!--ÁREA PARA FOTO-->

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

      <p
        v-if="foto"
        @click="foto = null"
        class="mt-3 text-[#A7A7A7] cursor-pointer hover:underline hover:text-red-600 transition-all duration-200"
        title="Remover foto"
      >
        X Remover
      </p>

      <!--INPUT PARA USERNAME-->

      <div class="mt-10 text-left">
        <label for="username" class="text-xl font-medium"
          >Username <span class="mdi mdi-account text-2xl"></span
        ></label>

        <input
          type="text"
          id="username"
          placeholder="@exemplo"
          v-model="userStore.usuario.username"
          class="py-2 px-3 mt-4 border border-[#A7A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#386641] transition-all duration-200 w-full"
        />
      </div>

      <p v-if="erroMatricula" class="text-red-600 text-left mt-2 font-medium">
        Já existe um usuário cadastrado com esses dados.
      </p>

      <BtnContinuarComponent
        @click="registrarAluno()"
        :disabled="!userStore.usuario.username"
        class="mt-5"
      />

      <BtnVoltarComponent @click="emit('prev')" class="top-110 left-0" />
    </div>
  </section>
</template>
