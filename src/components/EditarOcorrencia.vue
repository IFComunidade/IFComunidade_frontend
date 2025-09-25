<script setup>
import { ref, computed } from 'vue'

const props = defineProps(['descricaoAtual'])
const emit = defineEmits(['salvar', 'sair'])
const descricao = ref(props.descricaoAtual || '')

const vazia = computed(() => descricao.value.trim() === '')
const igual = computed(() => descricao.value.trim() === (props.descricaoAtual || '').trim())

const salvarAlteracoes = () => {
  if (!vazia.value && !igual.value) {
    emit('salvar', descricao.value.trim())
  }
}
</script>

<template>
  <section>
    <textarea
      v-model="descricao"
      class="w-full border border-[#386641] rounded focus:outline-none focus:border-2 p-2"
      rows="4"
    >
    </textarea>

    <div class="flex justify-end gap-3 mt-4">
      <button @click="emit('sair')" class="px-10 py-2 text-[#386641] rounded border-1 border-[#386641] font-bold transition-all duration-500 hover:scale-103 hover:bg-[#EDEDED] hover:shadow-lg cursor-pointer">Cancelar</button>
      <button
        @click="salvarAlteracoes"
        :disabled="vazia || igual"
        class=" text-white px-10 py-2 bg-[#386641] rounded font-bold transition-all duration-500 hover:scale-103 hover:bg-[#29452E] hover:shadow-lg cursor-pointer disabled:opacity-50"
      >
        Salvar
      </button>
    </div>
  </section>
</template>
