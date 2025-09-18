<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  ocorrenciaId: Number,
  statusAtual: Number,
})

const statusSelecionado = ref(null)
const emit = defineEmits(['mudar-status'])

function confirmarAtualizacao() {
  if (!statusSelecionado.value || statusSelecionado.value === props.statusAtual) return

  emit('mudar-status', { id: props.ocorrenciaId, status: statusSelecionado.value })
}
</script>

<template>
  <p class="text-[#A7A7A7] text-xl mb-2">Controles</p>
  <form action="">
    <ul class="w-75">
      <li class="mb-2">
        <input
          type="radio"
          name="status"
          id="analise"
          v-model="statusSelecionado"
          :value="2"
          class="mr-1"
        />
        <label for="analise" class="accent-[#386641]">
          Marcar como “Em análise” <span class="mdi mdi-email-fast-outline"></span>
        </label>
      </li>
      <li class="mb-2">
        <input
          type="radio"
          name="status"
          id="resolvido"
          v-model="statusSelecionado"
          :value="3"
          class="mr-1"
        />
        <label for="resolvido">
          Marcar como “Resolvido” <span class="mdi mdi-email-check-outline"></span>
        </label>
      </li>
      <li class="mb-2">
        <input
          type="radio"
          name="status"
          id="naoresolvido"
          v-model="statusSelecionado"
          :value="4"
          class="mr-1"
        />
        <label for="naoresolvido">
          Marcar como “Não resolvido” <span class="mdi mdi-email-remove-outline"></span>
        </label>
      </li>

      <button
        type="button"
        class="bg-[#386641] text-white px-4 py-2 rounded disabled:bg-white disabled:text-[#386641] disabled:border disabled:border-[#386641]-2 cursor-pointer"
        :disabled="!statusSelecionado || statusSelecionado === props.statusAtual"
        @click="confirmarAtualizacao"
      >
        Atualizar
      </button>
    </ul>
  </form>
</template>
