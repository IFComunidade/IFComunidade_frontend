import api from '@/plugins/api'

class TramiteService {
  async getAllTramites() {
    try {
      const { data } = await api.get('/tramites');
      return data.results;
    }
    catch(error) {
      console.error('Erro ao buscar ocorrências:', error);
      throw error;
    }
  }

  async getTramiteByID(id) {
    try {
      const { data } = await api.get(`/tramites/${id}`);
      return data;
    } catch (error) {
      console.error(`Erro ao buscar tramite com ID ${id}:`, error);
      throw error;
    }
  }

  async addTramite(NovoTramite) {
    try {
      const { data } = await api.post('/tramites', NovoTramite);
      return data;
    } catch (error) {
      console.error('Erro ao adicionar tramite:', error);
      throw error;
    }
  }

  async atualizarTramite(id, TramiteAtt) {
    try {
      const { data } = await api.put(`/tramites/${id}`, TramiteAtt);
      return data;
    } catch (error) {
      console.error(`Erro ao atualizar tramite com ID ${id}:`, error);
      throw error;
    }
  }

  async attParcialmenteTramite(id, TramiteAtt) {
    try {
      const { data } = await api.patch(`/tramites/${id}`, TramiteAtt);
      return data;
    } catch (error) {
      console.error(`Erro ao atualizar parcialmente tramite com ID ${id}:`, error);
      throw error;
    }
  }

  async deletarTramite(id) {
    try {
      await api.delete(`/tramites/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar tramite com ID ${id}:`, error);
      throw error;
    }
  }
}

export default new TramiteService();
