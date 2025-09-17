<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useOcorrenciaStore } from '@/stores/ocorrenciaStore'
import { onMounted } from 'vue'
//import { useRouter } from 'vue-router';

const ocorrenciaStore = useOcorrenciaStore()
const userStore = useUserStore()

// const router = useRouter();

onMounted(() => {
  ocorrenciaStore.getOcorrencias()
  console.log(ocorrenciaStore.ocorrencias)
})

const pesquisa = ref('')
</script>

<template>
  <section class="px-22 flex flex-col justify-start min-h-screen">
    <div class="flex gap-6 mt-20 mb-15">
      <span class="mdi mdi-arrow-left text-3xl font-bold text-[#386641]"></span>
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

      <div class="relative flex-grow max-w-[300px]">
        <span class="mdi mdi-magnify absolute top-2 left-43 text-gray-500"></span>
        <input
          type="text"
          v-model="pesquisa"
          placeholder="Buscar Ocorrência"
          class="bg-[#F1F1F1] text-sm placeholder:text-xs py-2 focus:outline-none focus:ring-0 pl-6"
        />
      </div>
    </div>

    <div>
      <table>
        <thead>
          <tr scope="col">
            Título
          </tr>
          <tr scope="col">
            Tipo Ocorrência
          </tr>
          <tr scope="col">
            Categoria
          </tr>
          <tr v-if="userStore.usuario.tipo === 1">
            Status
          </tr>
          <tr v-if="userStore.usuario.tipo === 2">
            Data
          </tr>
        </thead>

        <tbody>
          <tr v-for="ocorrencia in ocorrenciaStore.ocorrencias" :key="ocorrencia.id">
            <td>{{ ocorrencia.titulo }}</td>
            <td>{{ ocorrencia.tipo_display }}</td>
            <td>{{ ocorrencia.categoria }}</td>
            <!-- se quiser mostrar nome, precisa mapear o ID -->
            <td v-if="userStore.usuario.tipo === 1">{{ ocorrencia.status }}</td>
            <td v-if="userStore.usuario.tipo === 2">{{ ocorrencia.created_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
