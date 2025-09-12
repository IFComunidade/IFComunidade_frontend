<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { AlunosCadastrados } from './matriculas';

const userStore = useUserStore();
const confirmarSenha = ref('');
const matricula = ref('');
let aluno = ref(null);


watch(matricula, (nova) => {
  aluno.value = AlunosCadastrados.find(a => a.matricula === nova) || null
})


async function registrarAluno() {

  userStore.usuario.nome = aluno.value.nome
  userStore.usuario.matricula = aluno.value.matricula
  userStore.usuario.curso = aluno.value.curso.id
  userStore.usuario.cpf = aluno.value.cpf


  if (userStore.usuario.password !== confirmarSenha.value) {
    alert('As senhas não coincidem.')
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

    <div>
      <label for="matricula">Digite sua matrícula</label>
      <input type="text" id="matricula" v-model="matricula" placeholder="Matrícula" required />
    </div>

    <br>

    <div v-if="aluno">
      Esse é você?
      <ul>
        <li>{{ aluno.nome }}</li>
        <li>{{ aluno.curso.nome }}</li>
        <li>{{ aluno.matricula }}</li>
        <li>{{ aluno.cpf }}</li>
      </ul>
    </div>
    <div v-else-if="matricula">
      Matrícula não encontrada.
    </div>

    <button type="submit">Registrar</button>
  </form>
</template>


