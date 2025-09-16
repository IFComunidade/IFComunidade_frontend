import api from '@/plugins/api'

class OpcaoService {
  async getAllOpcao() {
    try {
      const { data } = await api.get('/opcoes');
      return data;
    }
    catch(error) {
      console.error('Erro ao buscar opções:', error);
      throw error;
    }
  }

  async getOpcaoByID(id) {
    try {
      const { data } = await api.get(`/opcoes/${id}`);
      return data;
    } catch (error) {
      console.error(`Erro ao buscar opção com ID ${id}:`, error);
      throw error;
    }
  }

  async addOpcao(NovaOpcao) {
    try {
      const { data } = await api.post('/opcoes', NovaOpcao);
      return data;
    } catch (error) {
      console.error('Erro ao adicionar opção:', error);
      throw error;
    }
  }

  async attOpcao(id, OpcaoAtt) {
    try {
      const { data } = await api.put(`/opcoes/${id}`, OpcaoAtt);
      return data;
    } catch (error) {
      console.error(`Erro ao atualizar opção com ID ${id}:`, error);
      throw error;
    }
  }

  async attParcialmenteOpcao(id, OpcaoAtt) {
    try {
      const { data } = await api.patch(`/opcoes/${id}`, OpcaoAtt);
      return data;
    } catch (error) {
      console.error(`Erro ao atualizar parcialmente opção com ID ${id}:`, error);
      throw error;
    }
  }

  async deletarOpcao(id) {
    try {
      await api.delete(`/opcoes/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar opção com ID ${id}:`, error);
      throw error;
    }
  }
}

export default new OpcaoService();
