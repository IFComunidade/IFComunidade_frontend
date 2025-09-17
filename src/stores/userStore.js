import { ref, computed } from "vue";
import { defineStore } from "pinia";
import userService from "@/services/userService";

export const useUserStore = defineStore('usuario', () => {

  const usuario = ref({
    id: null,
    email: '.',
    password: '',
    nome: '',
    cpf: '',
    matricula: '',
    curso: null,
    sigla: '',
    tipo: 1,  // 1 - aluno, 2 - setor
    foto_attachment_key: null,
  });

  const users = ref([]);

  const tokens = ref({
    access: null,
    refresh: null
  })

  //Pegar todos os usuarios
  const getAllUsers = async () => {
    try {
      users.value = await userService.getAllUsers();
      console.log(users.value);
    } catch (error) {
      console.error('Erro ao obter usuários', error);
      throw error;
    }
  }


  //LOGIN
  const login = async (email, password) => {
    try {
      const data = await userService.login(email, password);
      console.log ( data )
      tokens.value.access = data.access;
      tokens.value.refresh = data.refresh;

      //PREENCHE OS DADOS:
      usuario.value = data.user;

      localStorage.setItem('token', data.access);
      localStorage.setItem('user', JSON.stringify(data.user));

      return data
    } catch (error) {
      console.error('Erro ao fazer login', error);
      throw error;
    }
  };

  //VERIFICA SE ESTA LOGADO
  const isLoggedIn = computed(() => !!tokens.value.access);


  //CADASTRO
  const registrarUsuario = async (usuario) => {
    try {
      const novoUsuario = await userService.registro(usuario);
      return novoUsuario;
    } catch (error) {
      console.error('Erro ao registrar usuário', error);
      throw error;
    }
  };

  //LOGOUT
  const logout = () => {
    usuario.value = {
      email: '',
      password: '',
      nome: '',
      cpf: '',
      matricula: '',
      curso: null,
      sigla: '',
      tipo: 1,
      foto_attachment_key: null
    };

    tokens.value = { access: null, refresh: null };

    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }


  const initStore = () => {
  const savedToken = localStorage.getItem('token');
  const savedUser = localStorage.getItem('user');

  if (savedToken && savedUser) {
    tokens.value.access = savedToken;
    usuario.value = JSON.parse(savedUser);
  }
};

initStore();

  return { usuario, users, getAllUsers, registrarUsuario, login, isLoggedIn, logout };

})
