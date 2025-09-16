<script setup>
  defineEmits(['click'])
</script>

<template>
  <button
    @click="$emit('click')"
     type="button"
    class="flex justify-center gap-1 items-center bg-[#386641] text-white mb-5 p-2 rounded cursor-pointer font-bold transition-all duration-500 hover:scale-103 hover:bg-[#29452E] hover:gap-3 hover:shadow-lg"
  >
    Continuar <span class="mdi mdi-arrow-right text-lg"></span>
  </button>
</template>
