import { reactive } from "vue";
import { defineStore } from "pinia";
import userService from "@/services/userService";

export const useUserStore = defineStore('usuario', () => {

  const usuario = reactive({
    email: '',
    password: '',
    nome: '',
    cpf: '',
    matricula: '',
    curso: null,
    sigla: '',
    tipo: 1,  // 1 - aluno, 2 - setor
    foto_attachment_key: null,
  });

  const tokens = reactive({
    access: null,
    refresh: null
  })


  //LOGIN
  const login = async (email, password) => {
    try {
      const data = await userService.login(email, password);

      tokens.access = data.access;
      tokens.refresh = data.refresh;

      //PREENCHE OS DADOS:
      usuario.nome = data.usuario.nome;
      usuario.email = data.usuario.email;
      usuario.tipo = data.usuario.tipo;
      usuario.matricula = data.usuario.matricula;
      usuario.cpf = data.usuario.cpf;
      usuario.sigla = data.usuario.sigla;
      usuario.foto_attachment_key = data.usuario.foto_attachment_key;

      return data
    } catch (error) {
      console.error('Erro ao fazer login', error);
      throw error;
    }
  };

  //VERIFICA SE ESTA LOGADO
    const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token;
  }


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
    userService.logout();
    usuario.email =  '';
    usuario.nome = '';
    usuario.cpf = '';
    usuario.matricula = '';
    usuario.curso = null;
    usuario.sigla = '';
    usuario.tipo = 1;
    usuario.foto_attachment_key = null;
  }

  return { usuario, registrarUsuario, login, isLoggedIn, logout };

})
