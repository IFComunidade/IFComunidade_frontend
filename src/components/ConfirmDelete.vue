<script setup>
const emit = defineEmits(['continuar', 'fechar'])

</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
    <div class="bg-white p-10 shadow-lg rounded">
      <h2 class="text-3xl font-bold mb-3">Deletar ocorrência?</h2>
      <p class="text-lg w-180">Tem certeza que deseja excluir esta ocorrência? Essa ação é <span class="font-bold">permanente</span> e não poderá ser desfeita.</p>
      <div class="flex gap-5 mt-3">
        <button @click="emit('fechar')" class="px-10 py-2 text-[#386641] rounded border-1 border-[#386641] font-bold transition-all duration-500 hover:scale-103 hover:bg-[#EDEDED] hover:shadow-lg cursor-pointer">Não, voltar</button>
        <button @click="emit('continuar')" class="text-white px-10 py-2 bg-[#386641] rounded font-bold transition-all duration-500 hover:scale-103 hover:bg-[#29452E] hover:shadow-lg cursor-pointer">Sim, excluir</button>
      </div>
    </div>
  </div>
</template>
