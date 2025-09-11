<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
// import { AlunosCadastrados } from './matriculas.js'

const userStore = useUserStore();
const confirmarSenha = ref('');
// ## const matricula = ref('');
const tela = ref(1);

async function registrarAluno() {
  if (!userStore.usuario.password !== confirmarSenha.value) {
    alert('As senhas não coincidem')
    return
  }

  try {
    const novoAluno = await userStore.registrarUsuario(userStore.usuario)
    console.log('Aluno cadastrado com sucesso:', novoAluno)
    alert('Cadastro realizado com sucesso!')
  } catch (error) {
    console.error(error)
    alert('Erro ao registrar aluno')
  }
}
</script>

<template v-if="tela === 1">
  <h1>Registro de Alunos</h1>
  <br>
  <form @submit.prevent="registrarAluno()">
    <div>
      <label for="email">Digite seu email</label>
      <input type="email" id="email" v-model="userStore.usuario.email" placeholder="Email" required />
    </div>

    <br>

    <div>
      <label for="senha">Digite senha</label>
      <input type="password" id="senha" v-model="userStore.usuario.password" placeholder="Senha" required />
    </div>

    <br>

    <div>
      <label for="confirmar-senha">Confirme sua senha</label>
      <input type="password" id="confirmar-senha" v-model="confirmarSenha" placeholder="Confirme a senha" required />
    </div>

    <br>

    <button @click="tela + 1">Continuar</button>

  </form>
</template>


