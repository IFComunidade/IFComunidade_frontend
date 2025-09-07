<script setup>
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';

const userStore = useUserStore();
const confirmarSenha = ref('');

async function registrar() {

  userStore.usuario.tipo = 2;

  // Validação de senha
  if(userStore.usuario.password !== confirmarSenha.value) {
    alert('As não coincidem');
    return;
  }

  // Validação de email
  if(!userStore.usuario.email.endsWith('@ifc.edu.br')) {
    alert('Para registar um setor, utilize um email institucional');
    return;
  }

  console.log(userStore.usuario);

  try {
    const novoUsuario = await userStore.registrarUsuario(userStore.usuario)
    console.log('Usuário cadastrado com sucesso:', novoUsuario)
    alert('Cadastro realizado com sucesso!')
  } catch (error) {
    console.error(error)
    alert('Erro ao registrar usuário')
  }
}



</script>

<template>
  <div>
    <p>PlayGround: área para testes</p>

    <div>
      <h2 class="font-semibold">Área para registro de setor</h2>
      <form @submit.prevent="registrar">
        <label for="email">Digite seu email:</label>
        <input
          type="email"
          placeholder="Nome"
          id="email"
          name="email"
          v-model="userStore.usuario.email"
          required
        />

        <label for="senha">Digite sua senha</label>
        <input
          type="password"
          placeholder="Senha"
          id="senha"
          name="senha"
          v-model="userStore.usuario.password"
          required
        />

        <label for="confirmar-senha">Confirme sua senha</label>
        <input type="password" name="confirmar-senha" v-model="confirmarSenha" required />

        <label for="nome">Digite o nome do setor</label>
        <input
          type="text"
          placeholder="Nome do setor"
          id="nome"
          name="nome"
          v-model="userStore.usuario.nome"
          required
        />

        <label for="sigla">Sigla</label>
        <input
          type="text"
          placeholder="Sigla"
          id="sigla"
          name="sigla"
          v-model="userStore.usuario.sigla"
          required
        />

        <button type="submit">Registrar</button>
      </form>
    </div>
  </div>
</template>
