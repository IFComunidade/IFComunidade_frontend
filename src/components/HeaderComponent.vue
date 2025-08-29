<script setup>

import LoginComponent from './LoginComponent.vue';
import BotaoCadastroComponent from './BotaoCadastroComponent.vue';

</script>

<template>
    <header class="mt-5" >
        <div class="flex items-center justify-between">
        <div class="pl-18">
        <img src="/Logo.png" alt="logo">
    </div>
    <div class="flex" >
        <nav>
            <ul class="flex gap-10 justify-center text-center">
                <li class="">
                    <RouterLink to= "/">
                       <p class="">Início</p> 
                     </RouterLink>
                </li>
                 <li>
                    <RouterLink to= "/MURALinterliga">
                       <p>MURALinterliga</p> 
                     </RouterLink>
                </li>
                <li>
                    <RouterLink to= "/Ocorrencias">
                        <p>Ocorrências</p>
                     </RouterLink>
                </li>
            </ul>
        </nav>
    </div>
    <div>
        <ul class="flex gap-10 pr-35">
                <li class="">
                <RouterLink to= "/Cadastro">
                    <BotaoCadastroComponent />
                </RouterLink>
                </li>
                <li class="mx-10">
                <RouterLink to= "/Login">
                    <LoginComponent />
                </RouterLink>
                </li>
        </ul>
    </div>
    </div>
    </header>
</template>

