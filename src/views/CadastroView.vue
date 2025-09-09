<script setup>

</script>

<template>
    <section class="flex flex-col justify-center items-center text-center mt-10 mb-5">
        <img src="/public/LogoIFC.png" alt="logo" class="w-40rem h-20rem mb-4">
        <h1 class="text-5xl font-bold text-center mb-20">Entre na nossa comunidade.</h1>
        <div class="flex justify-center items-center gap-12">
            <div class="w-full max-w-md">
                <ul class="text-left w-full">
                    <li>
                        <p class="mb-2">Email <span class="mdi mdi-email-outline"></span></p>
                        <input type="email" id="email" placeholder="exemplo@gmail.com"
                            class="border border-gray-400 rounded py-3 pr-3 pl-2 w-full placeholder-gray-500 ">
                    </li>
                    <li class="mt-2">
                        <p class="mb-2 w-full">Senha <span class="mdi mdi-lock-outline"></span></p>
                        <input type="password" name="senha" placeholder="Digite sua senha" id="senha"
                            class="border border-gray-400 rounded py-3 pr-3 pl-2 w-full placeholder-gray-500 ">
                    </li>
                    <li class="mt-2 w-full">
                        <p class="mb-2">Confirme senha</p>
                        <input type="password" id="confirmesenha" placeholder="Confirme sua senha"
                            class="border border-gray-400 rounded py-3 pr-3 pl-2 mb-10 w-full placeholder-gray-500">
                    </li>
                </ul>
                <button
                    class="w-full text-center px- bg-[#386641] font-bold text-[#FFFCF7] py-3 border rounded transition-transform duration-200 hover:scale-105 pointer">
                    Continuar <span class="mdi mdi-arrow-right"></span></button>
                <div class="text-left mt-2">
                    <p>Já faz parte de um setor? <a href="#" class="text-[#2D88D4]">Clique aqui</a></p>
                    <p><a href="LoginView.vue" class="text-[#2D88D4] underline cursor: pointer">Já possuo uma conta.</a>
                    </p>
                </div>
            </div>
        </div>
        <img src="/public/mobile-login.png" alt="mobile" class="w-100 ml-auto -mt-50 mr-100">
        <button
            class="px-10 py-2 text-[#386641] rounded border-1 border-[#386641] font-bold transition-transform duration-200 hover:scale-105 -mt-30 mr-150">
            <span class="mdi mdi-arrow-left"></span> Voltar</button>
    </section>
     <div class="w-screen px-8 mt-50 relative">
            <div class="absolute top-5 left-8 right-8 h-0.5 bg-gray-300 z-0"></div>
            <ul class="flex justify-between w-full px-8">
                <li class="text-left flex flex-col relative">
                    <span class="mdi mdi-record-circle text-3xl text-center text-[#C0C0C0]"></span>
                    <p class="text-[#736C6C] text-center">Informações Iniciais</p>
                    <p class="text-center text-[#C0C0C0]">Email e senha</p>
                </li>
                <li class="text-center flex flex-col relative">
                    <span class="mdi mdi-record-circle text-3xl text-center text-[#C0C0C0] "></span>
                    <p class="text-[#736C6C] text-center">Confirme sua Identidade</p>
                    <p class="text-[#C0C0C0] text-center">Verificação</p>
                </li>
                <li class="text-right flex flex-col relative">
                    <span class="mdi mdi-record-circle text-3xl text-center text-[#C0C0C0]"></span>
                    <p class="text-[#736C6C] text-center">Detalhes Finais</p>
                    <p class="text-center text-[#C0C0C0]">Nome, CPF, Curso, etc...</p>
                </li>
            </ul>
        </div>
</template>
<style scoped></style>