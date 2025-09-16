<script setup>

</script>
<template>
<section class="px-22 flex flex-col justify-start min-h-screen">
  
    <div class="flex gap-6 mt-20 mb-15">
      <span class="mdi mdi-arrow-left text-3xl font-bold text-[#386641]"></span>
      <h1 class="text-[#386641] text-3xl font-bold">Registrar Ocorrência</h1>
    </div>
    <div>
        <p class="mb-8 text-lg w-270 font-semibold">A Ouvidoria é o canal direto para você registrar queixas, denúncias ou sugestões, ajudando a melhorar o ambiente e garantindo mais transparência e respeito aos seus direitos dentro do campus.</p>
        <p class="text-lg font-semibold mb-8 w-350">Sua manifestação será analisada com seriedade e você poderá acompanhar cada etapa do processo.</p>
    </div>
    <form class="flex gap-4 mt-4 text-lg font-semibold">
  <label class="flex items-center gap-2">
    <input
      type="radio"
      name="identificacao"
      value="sim"
      class="accent-[#2E5939]"
    />
    Quero me identificar.
  </label>

  <label class="flex items-center gap-2">
    <input
      type="radio"
      name="identificacao"
      value="nao"
      class="accent-[#2E5939]"
    />
    Não quero me identificar.
  </label>
</form>
</section>
</template>