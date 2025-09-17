<script setup>
import { useCategoriaStore } from '@/stores/categoriaStore'
import { onMounted, ref } from 'vue'

const categoriaStore = useCategoriaStore()
const emit = defineEmits(['selecionar'])


onMounted(() => {
  categoriaStore.getCategorias()
})

const mostrarCategorias = ref(false)
const categoriaSelecionada = ref({ id: null, nome: 'Selecionar' })

const mudarVisibilidadeCategorias = () => {
  mostrarCategorias.value = !mostrarCategorias.value
}

const mudarCategoria = (categoria) => {
  if(categoria.id === null) return
  categoriaSelecionada.value = categoria
  mostrarCategorias.value = false
  emit('selecionar', categoria.id)
}
</script>

<template>

  <div class="relative w-45">

     <div
        class="border border-[#386641] px-2 py-1 font-medium rounded cursor-pointer flex justify-between items-center"
        @click="mudarVisibilidadeCategorias"
        >
        <p>{{ categoriaSelecionada.nome }}</p>
        <span
          :class="mostrarCategorias ? 'mdi mdi-menu-up' : 'mdi mdi-menu-down'"
          class="text-xl"
          ></span>
      </div>


      <div v-if="mostrarCategorias">
        <ul class="absolute z-100 bg-white border rounded border-[#386641] w-full top-12 shadow-lg">
          <li
            v-for="categoria in categoriaStore.categorias"
            :key="categoria.id"
            @click="mudarCategoria(categoria)"
            class="cursor-pointer p-2 text-medium hover:bg-[#DEFFEA] hover:text-[#386641] transition-all duration-200"
            >
            {{ categoria.nome }}
          </li>
        </ul>
      </div>

  </div>

</template>
