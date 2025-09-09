<script setup>

</script>

<template>
    <section class="flex flex-col justify-center items-center text-center mt-10 mb-5">
        <img src="/public/LogoIFC.png" alt="logo" class="w-40rem h-20rem mb-4">
        <h1 class="text-4xl font-bold text-center mb-20">Entre na nossa comunidade.</h1>
        <div class="flex justify-center items-center gap-12">
            <div>
                <ul class="text-left">
                    <li>
                        <p class="mb-2">Email <span class="mdi mdi-email-outline"></span></p>
                        <input type="email" id="email" placeholder="exemplo@gmail.com"
                            class="border border-gray-400 rounded py-3 pr-3 pl-2 w-70 placeholder-gray-500 ">
                    </li>
                    <li class="mt-2">
                        <p class="mb-2 w-full">Senha <span class="mdi mdi-lock-outline"></span></p>
                        <input type="password" name="senha" placeholder="Digite sua senha" id="senha"
                            class="border border-gray-400 rounded py-3 pr-3 pl-2 w-70 placeholder-gray-500 ">
                    </li>
                    <li class="mt-2 w-full">
                        <p class="mb-2">Confirme senha</p>
                        <input type="password" id="confirmesenha" placeholder="Confirme sua senha"
                            class="border border-gray-400 rounded py-3 pr-3 pl-2 mb-10 w-70 placeholder-gray-500">
                    </li>
                </ul>
                <button
                    class="w-70 text-center px- bg-[#386641] font-bold text-[#FFFCF7] py-3 border rounded transition-transform duration-200 hover:scale-105 pointer"> Continuar <span class="mdi mdi-arrow-right"></span></button>
                <div class="text-left mt-2">
                <p>Já faz parte de um setor? <a href="#" class="text-[#2D88D4]">Clique aqui</a></p>
                <p><a href="LoginView.vue" class="text-[#2D88D4] underline cursor: pointer">Já possuo uma conta.</a></p>
                </div>
            </div>
        </div>
        <img src="/public/mobile-login.png" alt="mobile" class="w-100 ml-auto -mt-50 mr-40">
        <button class="px-10 py-2 text-[#386641] rounded border-1 border-[#386641] font-bold transition-transform duration-200 hover:scale-105 -mt-30 mr-150"> <span class="mdi mdi-arrow-left"></span> Voltar</button>
        <div>
            <ul class="flex">
                <li class="">
                    <p class="font-bold">Informações Inicias</p>
                    <p>Email e senha</p>
                </li>
                <li>a</li>
                <li>a</li>
            </ul>
        </div>
    </section>
</template>
<style scoped></style>