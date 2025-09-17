import api from '@/plugins/api'

class UserService {

  async login (email, password) {
    try{
      const { data } = await api.post('token/', { email, password })

      localStorage.setItem('token', data.access);
      localStorage.setItem('refreshToken', data.refresh);

      return data;
    } catch (error) {
      console.error('Erro ao fazer login', error);
      throw error;
    }
  }

  async registro (user) {
    try{

      const dados = {...user}

      if(!dados.foto) {
        delete dados.foto
      }

      const { data } = await api.post('usuarios/', dados)
      return data;
    } catch (error) {
      console.error('Erro ao registrar usuário', error);
      throw error;
    }
  }

  async logout () {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    delete api.defaults.headers.common['Authorization'];
  }

  async getAllUsers () {
    try {
      const { data } = await api.get('usuarios/');
      return data;
    } catch (error) {
      console.error('Erro ao obter usuários', error);
      throw error;
    }
  }
}

export default new UserService();
