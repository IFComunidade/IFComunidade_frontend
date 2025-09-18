<script setup>
import { ref, computed } from 'vue'
import uploadImagem from '@/services/uploadImagem'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import BtnVoltarComponent from '@/components/BtnVoltarComponent.vue'

const router = useRouter()
const userStore = useUserStore()


const verSenha = ref(false)
const verConfirmarSenha = ref(false)


const validarSenha = ref('')
const focusSenha = ref(false)


const foto = ref(null)
const arquivoFoto = ref(null)


const mensagem = ref('')
const modalAberto = ref(false)


const selecionarFoto = (event) => {
  const file = event.target.files[0]
  if (file) {
    arquivoFoto.value = file
    foto.value = URL.createObjectURL(file)
  }
}


const requisitosSenha = computed(() => {
  const senha = userStore.usuario.password || ''
  return [
    { requisito: 'Mínimo de 8 caracteres', valido: senha.length >= 8 },
    { requisito: 'Ao menos um número', valido: /\d/.test(senha) },
  ]
})


const mudarVisibilidadeSenha = () => verSenha.value = !verSenha.value
const mudarVisibilidadeConfSenha = () => verConfirmarSenha.value = !verConfirmarSenha.value


const registrarSetor = async () => {
  try {
    userStore.usuario.tipo = 2

   
    if (arquivoFoto.value) {
      const attachmentKey = await uploadImagem.upload(arquivoFoto.value)
      userStore.usuario.foto_attachment_key = attachmentKey
    }

    const usuarioParaEnviar = {
      nome: userStore.usuario.nome,
      email: userStore.usuario.email,
      password: userStore.usuario.password,
      tipo: userStore.usuario.tipo,
      sigla: userStore.usuario.sigla,
      foto_attachment_key: userStore.usuario.foto_attachment_key || null
    }

    const response = await userStore.registrarUsuario(usuarioParaEnviar)
    console.log('Resposta do cadastro:', response)

    if (response && response.id) { 
      await userStore.login(userStore.usuario.email, userStore.usuario.password)

      // Modal de sucesso
      mensagem.value = 'Cadastro realizado com sucesso!'
      modalAberto.value = true

      setTimeout(() => {
        modalAberto.value = false
        router.push('/') 
      }, 1500)

    } else {
      mensagem.value = 'Erro no cadastro. Verifique os dados e tente novamente.'
      modalAberto.value = true
    }

  } catch (error) {
    console.error('Erro ao registrar setor:', error)
    mensagem.value = 'Erro ao registrar setor.'
    modalAberto.value = true
  }
}
</script>

<template>
<section class="flex flex-col justify-center items-center mt-10 mb-20">
  <img src="/public/LogoIFC.png" alt="logo" class="w-40rem h-20rem mb-4" />
  <h1 class="text-4xl font-bold text-center mb-20">Entre na nossa comunidade.</h1>

  <form @submit.prevent="registrarSetor" class="relative bg-[#FEFEFE] px-40 pb-10 pt-10 rounded">
    
    
    <div class="flex flex-col items-center">
      <label class="cursor-pointer relative" :title="foto ? 'Mudar foto' : 'Adicionar uma foto (opcional)'">
        <input type="file" accept="image/*" @change="selecionarFoto" class="hidden mb-5" />
        <img :src="foto || 'https://www.gravatar.com/avatar/?d=mp'" alt="Foto de perfil" class="w-30 h-30 rounded-full"/>
        <span class="mdi mdi-camera absolute bg-white rounded-full px-2 py-0.5 top-22 right-0 text-2xl text-[#9ACCAC]"></span>
      </label>
    </div>

  
    <div class="mb-5 mt-8">
      <label for="email" class="block text-lg font-medium mb-2">Email <span class="mdi mdi-email-outline"></span></label>
      <input type="email" id="email" placeholder="exemplo@gmail.com"
             class="py-2 px-3 border border-[#A7A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#386641] transition-all duration-200 w-full"
             v-model="userStore.usuario.email" />
    </div>

    <div class="mb-5">
      <label for="nome" class="block text-lg font-medium mb-2">Nome <span class="mdi mdi-account-edit"></span></label>
      <input type="text" id="nome" placeholder="Digite o nome do setor"
             class="py-2 px-3 border border-[#A7A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#386641] transition-all duration-200 w-full"
             v-model="userStore.usuario.nome" />
    </div>

    
    <div class="mb-5">
      <label for="sigla" class="block text-lg font-medium mb-2">Sigla <span class="mdi mdi-label-variant-outline"></span></label>
      <input type="text" id="sigla" placeholder="Digite a sigla do setor"
             class="py-2 px-3 border border-[#A7A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#386641] transition-all duration-200 w-full"
             v-model="userStore.usuario.sigla" />
    </div>

   
    <div class="relative mb-5">
      <label for="senha" class="block text-lg font-medium mb-2">Senha <span class="mdi mdi-lock-outline"></span></label>
      <input :type="verSenha ? 'text' : 'password'" id="senha" placeholder="Digite sua senha"
             class="py-2 px-3 border border-[#A7A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#386641] transition-all duration-200 w-full"
             v-model="userStore.usuario.password"
             @focus="focusSenha = true" @blur="focusSenha = false" />
      <span @click="mudarVisibilidadeSenha" :class="verSenha ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
            class="absolute right-4 top-11 cursor-pointer text-[#386641] text-lg"></span>

      <ul v-if="focusSenha">
        <li v-for="req in requisitosSenha" :key="req.requisito" class="text-sm mt-1 font-medium">
          <p>
            <span class="mdi" :class="req.valido ? 'text-green-600 mdi-check-circle' : 'text-red-600 mdi-close-circle'">
              {{ req.requisito }}
            </span>
          </p>
        </li>
      </ul>
    </div>

    <div class="relative mb-5">
      <label for="confirmarSenha" class="block text-lg font-medium mb-2">Confirme sua senha</label>
      <input v-model="validarSenha" :type="verConfirmarSenha ? 'text' : 'password'" id="confirmarSenha" placeholder="Confirme sua senha"
             class="py-2 px-3 border border-[#A7A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#386641] transition-all duration-200 w-full" />
      <span @click="mudarVisibilidadeConfSenha" :class="verConfirmarSenha ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
            class="absolute right-4 top-11 cursor-pointer text-[#386641] text-lg"></span>

      <p v-if="validarSenha && validarSenha !== userStore.usuario.password" class="text-red-600 text-base mt-1 font-medium">
        <span class="mdi mdi-alert-circle"></span> As senhas não coincidem
      </p>
    </div>

   
    <button type="submit"
            :disabled="!userStore.usuario.email || !userStore.usuario.sigla || !userStore.usuario.nome || !userStore.usuario.password"
            class="mt-5 px-22 flex justify-center gap-1 items-center bg-[#386641] text-white mb-5 p-2 rounded cursor-pointer font-bold transition-all duration-500 hover:scale-103 hover:bg-[#29452E] hover:gap-3 hover:shadow-lg">
      Enviar <span class="mdi mdi-arrow-right text-lg"></span>
    </button>
  </form>

 
   <div>
  <BtnVoltarComponent class="absolute top-267 left-100" @click="router.push('/Cadastro/Aluno')" />
  </div>  

 
  <div v-if="modalAberto" class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <div class="bg-white rounded-lg p-8 w-96 text-center shadow-lg">
      <p class="text-lg font-semibold mb-4">{{ mensagem }}</p>
      <button @click="modalAberto = false" class="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300 transition cursor-pointer">
        Fechar
      </button>
    </div>
  </div>
</section>
</template>
