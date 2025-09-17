<script setup>
import { ref } from 'vue'
import { useOcorrenciaStore } from '@/stores/ocorrenciaStore'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import uploadImagem from '@/services/uploadImagem'
import SelectTipoComponent from '@/components/selectTipoComponent.vue'
import SelectCategoriaComponente from '@/components/selectCategoriaComponente.vue'
import BuscaSetoresComponent from '@/components/buscaSetoresComponent.vue'

const router = useRouter()
const ocorrenciaStore = useOcorrenciaStore()
const userStore = useUserStore()
const anonima = ref(false)
const imagem = ref(null)
const arquivoImagem = ref(null)
const mensagem = ref('')
const tipoMensagem = ref('')
const modalAberto = ref(false)

const selecionarImagem = (event) => {
  const arquivo = event.target.files[0]
  if (arquivo) {
    arquivoImagem.value = arquivo
    imagem.value = URL.createObjectURL(arquivo)
    console.log('Foto selecionada:', arquivo)
  }
}

async function registrarPostagem() {
  mensagem.value = ''
  tipoMensagem.value = ''
  modalAberto.value = false

  if (
    !ocorrenciaStore.ocorrencia.titulo ||
    !ocorrenciaStore.ocorrencia.tipo ||
    !ocorrenciaStore.ocorrencia.categoria ||
    !ocorrenciaStore.ocorrencia.setor ||
    !ocorrenciaStore.ocorrencia.texto
  ) {
    mensagem.value = 'Por favor, preencha todos os campos.'
    tipoMensagem.value = 'erro'
    modalAberto.value = true
    return
  }

  try {
    if (arquivoImagem.value) {
      const attachmentKey = await uploadImagem.upload(arquivoImagem.value)
      ocorrenciaStore.ocorrencia.imagem_attachment_key = attachmentKey
    }

    ocorrenciaStore.ocorrencia.anonima = anonima.value
    ocorrenciaStore.ocorrencia.usuario = userStore.usuario.id

    await ocorrenciaStore.addOcorrencia(ocorrenciaStore.ocorrencia)

    mensagem.value = 'Ocorrência cadastrada com sucesso.'
    tipoMensagem.value = 'sucesso'
    modalAberto.value = true

    setTimeout(() => {
      modalAberto.value = false
      router.push('/ListagemOcorrencia')
    }, 1500)
  } catch (error) {
    if (error.response) {
      console.error('Erro ao registrar nova ocorrencia:', error.response.data)
      mensagem.value = `Erro: ${JSON.stringify(error.response.data)}`
    } else {
      console.error('Erro desconhecido:', error)
      mensagem.value = 'Erro desconhecido ao registrar ocorrência.'
    }

    tipoMensagem.value = 'erro'
    modalAberto.value = true
  }
}
</script>


<template>
  <section class="px-22 flex flex-col justify-start min-h-screen">
    <div class="flex gap-6 mt-20 mb-15">
      <span class="mdi mdi-arrow-left text-3xl font-bold text-[#386641]"></span>
      <h1 class="text-[#386641] text-3xl font-bold">
        <RouterLink to="/ListagemOcorrencia"> Registrar Ocorrência </RouterLink>
      </h1>
    </div>
    <div>
      <p class="mb-8 text-lg w-270 font-medium">
        A Ouvidoria é o canal direto para você registrar queixas, denúncias ou sugestões, ajudando a
        melhorar o ambiente e garantindo mais transparência e respeito aos seus direitos dentro do
        campus.
      </p>
      <p class="text-lg font-medium mb-8 w-350">
        Sua manifestação será analisada com seriedade e você poderá acompanhar cada etapa do
        processo.
      </p>
    </div>
    <section class="flex gap-4 mt-4 text-lg font-medium">
      <label class="flex items-center gap-2">
        <input
          type="radio"
          name="identificacao"
          :value="false"
          class="accent-[#2E5939]"
          v-model="anonima"
        />
        Quero me identificar.
      </label>

      <label class="flex items-center gap-2">
        <input
          type="radio"
          name="identificacao"
          :value="true"
          class="accent-[#2E5939]"
          v-model="anonima"
        />
        Não quero me identificar.
      </label>
    </section>
    <form @submit.prevent="registrarPostagem()">
      <!--Infos da ocorrência-->
      <div class="mt-10 flex items-stretch gap-4">
        <div class="bg-[#386641] flex justify-center items-center p-4">
          <span class="mdi mdi-clipboard-edit-outline text-white text-5xl"></span>
        </div>

        <div class="bg-white flex-1 px-10 py-10 flex flex-col justify-between">
          <div>
            <h2 class="text-3xl text-[#386641] font-semibold">Detalhes.</h2>
            <p class="text-lg my-4 font-medium text-[#A7A7A7]">
              Informações básicas e específicas que ajudam a identificar a situação.
            </p>

            <div class="flex gap-3 items-center mb-5">
              <label for="titulo" class="font-semibold text-2xl">Título:</label>
              <input
                class="w-130 text-lg border-b-2 border-[#A7A7A7] focus:outline-none focus:border-[#386641] transition-all duration-200"
                type="text"
                id="titulo"
                placeholder="Digite aqui o título da ocorrência"
                v-model="ocorrenciaStore.ocorrencia.titulo"
              />
            </div>

            <div class="flex items-center gap-3 mb-5">
              <h4 class="font-semibold text-2xl">Tipo da ocorrência:</h4>
              <SelectTipoComponent @selecionar="ocorrenciaStore.ocorrencia.tipo = $event" />
            </div>

            <div class="flex items-center gap-3 mb-5">
              <h4 class="font-semibold text-2xl">Categoria:</h4>
              <SelectCategoriaComponente
                @selecionar="ocorrenciaStore.ocorrencia.categoria = $event"
              />
            </div>

            <BuscaSetoresComponent @selecionar="ocorrenciaStore.ocorrencia.setor = $event" />
          </div>
        </div>
      </div>

      <!--Descrição ocorrência-->
      <div class="mt-10 flex items-stretch gap-4">
        <div class="bg-[#386641] flex justify-center items-center p-4">
          <span class="mdi mdi-chat-outline text-white text-5xl"></span>
        </div>

        <div class="bg-white flex-1 px-10 py-10 flex flex-col">
          <h2 class="text-3xl text-[#386641] font-semibold">Descrição</h2>
          <p class="text-lg my-4 font-medium text-[#A7A7A7]">
            Explique aqui o que aconteceu, com todas as informações que considerar importantes. Se
            achar necessário, é possível inserir imagens.
          </p>

          <textarea
            v-model="ocorrenciaStore.ocorrencia.texto"
            name="desc"
            id="desc"
            rows="10"
            cols="100"
            class="w-full border-2 border-[#386641] p-1 rounded focus:outline-none focus:bg-[#FFFCF7]"
          ></textarea>
          <div v-if="imagem" class="mt-4">
            <img
              :src="imagem"
              alt="Preview da imagem"
              class="w-25 h-25 object-cover rounded border"
            />
          </div>
          <label class="mt-5">
            <input type="file" accept="image/*" @change="selecionarImagem" class="hidden mb-5" />
            <p
              v-if="!imagem"
              class="flex items-center gap-3 text-base font-medium cursor-pointer text-[#A7A7A7] hover:underline transition-all duration-500"
            >
              <span class="mdi mdi-link-plus"></span> Inserir imagem
            </p>

            <p
              v-else
              @click="
                imagem = null;
                arquivoImagem = null
              "
              class="flex items-center gap-3 text-base font-medium cursor-pointer text-[#FF0000] hover:underline transition-all duration-500"
            >
              <span class="mdi mdi-close-circle-outline"></span> Remover imagem
            </p>
          </label>
        </div>
      </div>

      <ul class="flex justify-end gap-5 mt-8">
        <li>
          <button
            type="reset"
            class="px-10 py-2 text-[#386641] rounded border border-[#386641] font-bold transition-all duration-500 hover:scale-103 hover:bg-[#EDEDED] hover:gap-2 hover:shadow-lg cursor-pointer"
          >
            LIMPAR
          </button>
        </li>
        <li>
          <button
            type="submit"
            class="px-10 py-2 bg-[#386641] text-white rounded cursor-pointer font-bold transition-all duration-500 hover:scale-103 hover:bg-[#29452E] hover:gap-3 hover:shadow-lg"
          >
            ENVIAR
          </button>
        </li>
      </ul>
    </form>

    <!-- Modal de mensagem -->
    <div v-if="modalAberto" class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div class="bg-white rounded-lg p-8 w-96 text-center shadow-lg">
        <p class="text-lg font-semibold mb-4">{{ mensagem }}</p>
        <button
          @click="modalAberto = false"
          class="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
        >
          Fechar
        </button>
      </div>
    </div>
  </section>
</template>
