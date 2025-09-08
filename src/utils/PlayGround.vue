<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const userStore = useUserStore()
const router = useRouter()
const confirmarSenha = ref('')
const email = ref('')
const senha = ref('')

async function registrarSetor() {
  userStore.usuario.tipo = 2

  // Validação de senha
  if (userStore.usuario.password !== confirmarSenha.value) {
    alert('As não coincidem')
    return
  }

  // Validação de email
  if (!userStore.usuario.email.endsWith('@ifc.edu.br')) {
    alert('Para registar um setor, utilize um email institucional')
    return
  }

  console.log(userStore.usuario)

  try {
    const novoUsuario = await userStore.registrarUsuario(userStore.usuario)
    console.log('Usuário cadastrado com sucesso:', novoUsuario)
    alert('Cadastro realizado com sucesso!')
  } catch (error) {
    console.error(error)
    alert('Erro ao registrar usuário')
  }
}

async function login() {
  try {
    await userStore.login(email.value, senha.value)
    alert('Login feito')
    router.push('/')
  } catch (error) {
    console.error(error)
    alert('Erro ao fazer login')
  }
}
</script>

<template>
  <div>
    <p>PlayGround: área para testes</p>

    <br />

    <div>
      <h2 class="font-semibold">Área para registro de setor</h2>
      <br />

      <form @submit.prevent="registrarSetor">
        <label for="email">Digite seu email:</label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          v-model="userStore.usuario.email"
          required
        />

        <br />

        <label for="senha">Digite sua senha</label>
        <input
          type="password"
          placeholder="Senha"
          id="senha"
          name="senha"
          v-model="userStore.usuario.password"
          required
        />

        <br />

        <label for="confirmar-senha">Confirme sua senha</label>
        <input type="password" name="confirmar-senha" v-model="confirmarSenha" required />

        <br />

        <label for="nome">Digite o nome do setor</label>
        <input
          type="text"
          placeholder="Nome do setor"
          id="nome"
          name="nome"
          v-model="userStore.usuario.nome"
          required
        />

        <br />

        <label for="sigla">Sigla</label>
        <input
          type="text"
          placeholder="Sigla"
          id="sigla"
          name="sigla"
          v-model="userStore.usuario.sigla"
          required
        />

        <br />

        <button type="submit">Registrar</button>
      </form>
    </div>
  </div>

  <br />

  <div>
    <h2 class="font-semibold">Area para login</h2>

    <form @submit.prevent="login">
      <label for="emailLogin">Email</label>
      <input type="email" name="email" id="emailLogin" placeholder="Email" v-model="email" required />
      <br />
      <label for="senhaLogin">Senha</label>
      <input type="password" name="senha" id="senhaLogin" placeholder="senha" v-model="senha" required />
      <br />
      <button type="submit">ENTRAR</button>
    </form>
  </div>

  <button @click="userStore.logout()">SAIR</button>

  <div v-if="userStore.isLoggedIn()">
    <p>Logado com: {{ userStore.usuario.nome }}</p>
  </div>
  <div v-else>
    Não esta logado
  </div>
</template>
