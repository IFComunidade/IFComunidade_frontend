<script setup>
const emit = defineEmits(['abrir', 'atualizar', 'deletar']);

</script>

<template>
    <div class="bg-[#FFFCF7] rounded shadow-lg">
      <ul class="flex flex-col">
        <li @click.stop="emit('abrir')" class="flex items-center hover:bg-[#F0F0F0] py-2 gap-3 px-5 transition-all duration-200">
          <span class="mdi mdi-open-in-new text-lg text-[#386641]"></span>
          <p class="text-lg">Abrir</p>
        </li>
        <li @click.stop="emit('atualizar')" class="flex items-center gap-3 py-2 px-5 hover:bg-[#F0F0F0] transition-all duration-200">
          <span class="mdi mdi-pencil text-lg text-[#386641]"></span>
          <p class="text-lg">Editar</p>
        </li>
        <li @click.stop="emit('deletar')" class="flex items-center gap-3 py-2 px-5 hover:bg-[#FFAAAA] transition-all duration-200">
          <span class="mdi mdi-delete text-lg text-[#FF0707]"></span>
          <p class="text-lg text-[#FF0707]">Deletar</p>
        </li>
      </ul>
    </div>
</template>
