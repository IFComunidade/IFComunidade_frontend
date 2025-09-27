<script setup>
import { onMounted, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useOcorrenciaStore } from '@/stores/ocorrenciaStore'
import router from '@/router'
import OptionOcorrencia from './OptionOcorrencia.vue'
import ConfirmDelete from './ConfirmDelete.vue'

const ocorrenciaStore = useOcorrenciaStore()

const busca = ref('')
const abrirMenu = ref(null)
const abrirConfirmacao = ref(false)
const ocorrenciaSelecionada = ref(null)

const ocorrencias = computed(() => {
  return ocorrenciaStore.ocorrencias.filter((o) =>
    o.titulo.toLowerCase().includes(busca.value.toLowerCase()),
  )
})

function EditarOcorrencia(id) {
  router.push({
    name: 'Ocorrencia',
    params: { id },
    query: { editar: 'true' },
  })
}

function detalhesOcorrencia(id) {
  ocorrenciaStore.getOcorrenciaById(id)
  router.push({ name: 'Ocorrencia', params: { id } })
}

function mudarVisibilidadeConf(id) {
  ocorrenciaSelecionada.value = id
  abrirConfirmacao.value = true
}

function deletarOcorrencia() {
  if (ocorrenciaSelecionada.value != null) {
    ocorrenciaStore.deletarOcorrencia(ocorrenciaSelecionada.value)
    abrirConfirmacao.value = false
    ocorrenciaSelecionada.value = null
  }
}

onMounted(() => {
  ocorrenciaStore.getOcorrencias()
})
</script>

<template>
  <section class="px-22 flex flex-col justify-start min-h-screen relative">
    <div v-if="ocorrenciaStore.isLoading" class="flex justify-center items-center flex-1">
      <div
        class="animate-spin rounded-full h-12 w-12 border-4 border-[#386641] border-t-transparent"
      ></div>
    </div>

    <div v-else>
      <div class="flex gap-6 mt-20 mb-15">
         <RouterLink to="/">
        <span class="mdi mdi-arrow-left text-3xl font-bold text-[#386641]"></span>
        </RouterLink>
          <h1 class="text-[#386641] text-3xl font-bold">Suas Ocorrências</h1>
      </div>

      <div class="flex justify-between items-center mb-4">
        <RouterLink to="/RegistrarOcorrencia">
          <button
            type="button"
            class="px-6 py-1 bg-[#386641] rounded font-bold text-[#FFFCF7] cursor-pointer transition-all duration-500 hover:scale-103 hover:bg-[#29452E] hover:gap-3 hover:shadow-lg"
          >
            Registrar
          </button>
        </RouterLink>

        <div class="flex gap-3 bg-[#F1F1F1] px-2 py-1 items-center">
          <label for="pesquisa">
            <span class="mdi mdi-magnify text-[#A6A6A6] text-lg"></span>
          </label>
          <input
            type="text"
            id="pesquisa"
            placeholder="Buscar ocorrência"
            v-model="busca"
            class="flex-1 outline-none bg-transparent"
          />
        </div>
      </div>

      <div class="overflow-visable mt-8">
        <table v-if="ocorrencias.length > 0" class="min-w-full bg-inherit text-inherit">
          <thead class="text-left border-b-2 border-gray-200">
            <tr class="text-[#386641]">
              <th class="py-3 px-4 font-bold">Título</th>
              <th class="py-3 px-4 font-bold">Tipo Ocorrência</th>
              <th class="py-3 px-4 font-bold">Categoria</th>
              <th class="py-3 px-4 font-bold">Status</th>
            </tr>
          </thead>
          <tbody class="text-inherit">
            <tr
              v-for="ocorrencia in ocorrencias"
              class="hover:bg-[#DEFFEA] transition-all duration-200 cursor-pointer"
              :key="ocorrencia.id"
              @click="detalhesOcorrencia(ocorrencia.id)"
            >
              <td class="relative py-4 px-4 flex items-center gap-2 overflow-visable">
                <span
                  title="Opções"
                  class="mdi mdi-dots-vertical text-lg cursor-pointer"
                  @click.stop="abrirMenu = abrirMenu === ocorrencia.id ? null : ocorrencia.id"
                >
                </span>
                <OptionOcorrencia
                  v-if="abrirMenu === ocorrencia.id"
                  @abrir="detalhesOcorrencia(ocorrencia.id)"
                  @atualizar="EditarOcorrencia(ocorrencia.id)"
                  @deletar="
                    () => {
                      mudarVisibilidadeConf(ocorrencia.id), (abrirMenu = false)
                    }
                  "
                  class="absolute top-15 z-100"
                />
                <div>
                  <p class="text-xl">{{ ocorrencia.titulo }}</p>
                  <p class="text-sm text-gray-500">
                    {{ ocorrencia.usuario.username || 'sem username' }}
                  </p>
                </div>
              </td>
              <td class="py-4 px-4">
                <span
                  class="bg-[#E6F0EC] text-[#2E5939] text-sm px-3 py-1 rounded-full font-medium"
                >
                  {{ ocorrencia.tipo_display }}
                </span>
              </td>
              <td class="py-4 px-4">{{ ocorrencia.categoria_display }}</td>
              <td class="py-4 px-4 flex items-center gap-2">
                <span v-if="ocorrencia.status === 1" class="mdi mdi-email-outline"></span>
                <span
                  v-else-if="ocorrencia.status === 2"
                  class="mdi mdi-email-fast-outline text-xl"
                ></span>
                <span
                  v-else-if="ocorrencia.status === 3"
                  class="mdi mdi-email-check-outline"
                ></span>
                <span class="px-4 py-4">{{ ocorrencia.status_display }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-else-if="ocorrencias.length <= 0"
          class="flex flex-col justify-center items-center"
          style="height: 80vh"
        >
          <span class="mdi mdi-alert-circle-outline text-red-500 text-2xl"></span>
          <h4 class="text-gray-500 font-medium text-xl">Nenhuma ocorrência encontrada</h4>
        </div>
      </div>
    </div>

    <ConfirmDelete
      v-if="abrirConfirmacao"
      @continuar="deletarOcorrencia"
      @atualizar="EditarOcorrencia()"
      @fechar="abrirConfirmacao = false"
      class="absolute"
    />
  </section>
</template>
