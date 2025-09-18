import api from '@/plugins/api';

class CategoriaService {
  async getAllCategorias() {
    try {
      const { data } = await api.get('/categorias');
      return data;
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw error;
    }
  }

  async getCategoriaByID(id) {
    try {
      const { data } = await api.get(`/categorias/${id}`);
      return data;
    } catch (error) {
      console.error(`Erro ao buscar categoria com ID: ${id}:`, error);
      throw error;
    }
  }
}

export default new CategoriaService();
