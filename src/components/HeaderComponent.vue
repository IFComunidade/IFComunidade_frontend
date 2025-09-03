<script setup>

import { useRoute } from 'vue-router'
import LoginComponent from './LoginComponent.vue';
import BotaoCadastroComponent from './BotaoCadastroComponent.vue';

const route = useRoute();

const activeColor = (path) =>
  route.path === path ? 'color: #141414' : 'color: #A7A7A7';

</script>

<template>
    <header class="mt-5 px-22" >
        <div class="flex items-center justify-between">
        <div>
        <img src="/public/LogoIFC.png" alt="logo" class="w-[260px] h-[100px]">
    </div>
    <div class="flex" >
        <nav>
            <ul class="flex gap-10 justify-center text-center">
                <li class="">
                    <RouterLink to= "/" :style="activeColor('/')"
                    class="inline-block transition-transform duration-200 hover:scale-105">
                        Início
                     </RouterLink>
                </li>
                 <li>
                    <RouterLink to= "/MURALinterliga" :style="activeColor('/MURALinterliga')"
                    class="inline-block transition-transform duration-200 hover:scale-105">
                       MURALinterliga
                     </RouterLink>
                </li>
                <li>
                    <RouterLink to= "/Ocorrencias" :style="activeColor('/Ocorrencias')"
                    class="inline-block transition-transform duration-200 hover:scale-105">
                        Ocorrências
                     </RouterLink>
                </li>
            </ul>
        </nav>
    </div>
    <div>
        <ul class="flex gap-5">
                <li class="">
                <RouterLink to= "/Cadastro">
                    <BotaoCadastroComponent />
                </RouterLink>
                </li>
                <li class="">
                <RouterLink to= "/Login">
                    <LoginComponent />
                </RouterLink>
                </li>
        </ul>
    </div>
    </div>
    </header>
</template>

