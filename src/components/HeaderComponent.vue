<script setup>

import LoginComponent from './LoginComponent.vue';
import BotaoCadastroComponent from './BotaoCadastroComponent.vue';

</script>

<template>
    <header>

        <div class="bg-red-500 text-white p-4">oi</div>
        <div>
        <img src="/Logo.png" alt="logo">
    </div>
    <div>
        <nav>
            <ul>
                <li>
                    <RouterLink to= "/">
                        Início
                     </RouterLink>
                </li>
                 <li>
                    <RouterLink to= "/MURALinterliga">
                        MURALinterliga
                     </RouterLink>
                </li>
                <li>
                    <RouterLink to= "/Ocorrencias">
                        Ocorrências
                     </RouterLink>
                </li>
            </ul>
        </nav>
    </div>
    <div>
        <ul>
            <RouterLink to= "/Cadastro">
                <li>
                    <BotaoCadastroComponent />
                </li>
            </RouterLink>
            <RouterLink to= "/Login">
                <li>
                    <LoginComponent />
                </li>
            </RouterLink>
        </ul>
    </div>
    </header>
</template>

