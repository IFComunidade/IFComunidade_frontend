<script setup>

import LoginComponent from './LoginComponent.vue';
import BotaoCadastroComponent from './BotaoCadastroComponent.vue';

</script>

<template>
    <div>
        <h1> logo </h1>
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
</template>

