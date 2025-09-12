import api from '@/plugins/api'

class PostagemService {
  async getAllPostagem() {
    try {
      const { data } = await api.get('/postagens');
      return data
    }
    catch(error) {
      console.error('Erro ao buscar postagens:', error);
      throw error;
    }
  }

  async getPostagemByID(id) {
    try {
      const {data} = await api.get(`/postagens/${id}`)
      return data.results
    } catch (error) {
      console.error(`Erro ao buscar postagem com ID ${id}:`, error);
      throw error;
    }
  }

  async addPostagem(NovaPostagem) {
    try {
      const {data} = await api.post('/postagens', NovaPostagem);
      return data;
    } catch (error) {
      console.error('Erro ao adicionar postagem:', error);
      throw error;
    }
  }

  async atualizarOcorrencia(id, PostagemAtt) {
      try {
        const { data } = await api.put(`/postagens/${id}`, PostagemAtt);
        return data;
      } catch (error) {
        console.error(`Erro ao atualizar postagem com ID ${id}:`, error);
        throw error;
      }
    }

  async attParcialmentePostagem(id, PostagemAtt) {
      try {
        const { data } = await api.patch(`/postagens/${id}`, PostagemAtt);
        return data;
      } catch (error) {
        console.error(`Erro ao atualizar parcialmente postagem com ID ${id}:`, error);
        throw error;
      }
    }

  async deletarPostagem(id) {
      try {
        await api.delete(`/postagens/${id}`);
      } catch (error) {
        console.error(`Erro ao deletar postagem com ID ${id}:`, error);
        throw error;
      }
    }
}

export default new PostagemService()
