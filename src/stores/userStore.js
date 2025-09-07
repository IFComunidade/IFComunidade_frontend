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

  const registrarUsuario = async (usuario) => {
    try {
      const novoUsuario = await userService.registro(usuario);
      return novoUsuario;
    } catch (error) {
      console.error('Erro ao registrar usuário', error);
      throw error;
    }
  }


  return { usuario, registrarUsuario };

})
