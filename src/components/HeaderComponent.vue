<script setup>

import LoginComponent from './LoginComponent.vue';
import BotaoCadastroComponent from './BotaoCadastroComponent.vue';

</script>

<template>
    <header>
        <div class="flex items-center justify-between">
        <div>
        <img src="/Logo.png" alt="logo">
    </div>
    <div>
        <nav>
            <ul class="flex gap-10">
                <li class="">
                    <RouterLink to= "/">
                       <p>Início</p> 
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
        <ul class="flex gap-10">
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

