<script setup>

</script>

<template>
    <section class="flex flex-col justify-center items-center text-center mt-10 mb-5">
        <img src="/public/LogoIFC.png" alt="logo" class="w-40rem h-20rem mb-2">
        <h1 class="text-4xl font-bold">Entre na nossa comunidade.</h1>
        <div class="text-left mt-20">
            <ul>
                <li>
                    <p class="mb-2">Email<span class="mdi mdi-email-outline w-full"></span></p>
                    <input type="email" id="email" placeholder="exemplo@gmail.com" class="border border-gray-300 py-2 pl-1.5 w-60">
                </li>
                <li class="mt-2">
                    <p class="mb-2 w-full">Senha<span class="mdi mdi-lock-outline"></span></p>
                    <input type="password" name="senha" placeholder="Digite sua senha" id="senha" class="border border-gray-300 py-2 pl-1.5 w-60">
                </li>
                <li class="mt-2 w-full">
                    <p class="mb-2">Confirme senha</p>
                    <input type="password" id="confirmesenha" placeholder="Confirme sua senha" class="border border-gray-300 py-2 pl-1.5 mb-10 w-60">
                </li>
                <button class="w-60 text-center px- bg-[#386641] font-bold text-[#FFFCF7] py-3"> Continuar</button>
            </ul>
            <img src="" alt="">
        </div>
    </section>
</template>

<style scoped></style>