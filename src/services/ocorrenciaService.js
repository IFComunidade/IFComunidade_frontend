import api from '@/plugins/api'

class OcorrenciaService {
  async getAllOcorrencia() {
    try {
      const { data } = await api.get('/ocorrencias');
      return data
    }
    catch(error) {
      console.error('Erro ao buscar ocorrências:', error);
      throw error;
    }
  }

  async getOcorrenciaById(id) {
    try {
      const { data } = await api.get(`ocorrencias/${id}`);
      return data;
    } catch (error) {
      console.error(`Erro ao buscar ocorrência com ID ${id}:`, error);
      throw error;
    }
  }

  async addOcorrencia(NovaOcorrencia) {
    try {
      const { data } = await api.post('ocorrencias/', NovaOcorrencia);
      return data;
    } catch (error) {
      console.error('Erro ao adicionar ocorrência:', error);
      throw error;
    }
  }

  async atualizarOcorrencia(id, OcorrenciaAtt) {
    try {
      const { data } = await api.put(`ocorrencias/${id}`, OcorrenciaAtt);
      return data;
    } catch (error) {
      console.error(`Erro ao atualizar ocorrência com ID ${id}:`, error);
      throw error;
    }
  }

  async attParcialmenteOcorrencia(id, OcorrenciaAtt) {
    try {
      const { data } = await api.patch(`ocorrencias/${id}/`, OcorrenciaAtt);
      return data;
    } catch (error) {
      console.error(`Erro ao atualizar parcialmente ocorrência com ID ${id}:`, error);
      throw error;
    }
  }

  async deletarOcorrencia(id) {
    try {
      await api.delete(`ocorrencias/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar ocorrência com ID ${id}:`, error);
      throw error;
    }
  }
}

export default new OcorrenciaService();
