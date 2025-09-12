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
      const { data } = await api.post('usuarios/', user)
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
}

export default new UserService();
