import api from '@/plugins/api'

class TramiteService {
  async getAllTramites(ocorrenciaId = null) {
    try {
      let url = 'tramites/'
      if (ocorrenciaId) {
        url += `?ocorrencia_id=${ocorrenciaId}`
      }
      const { data } = await api.get(url)
      return data
    } catch (error) {
      console.error('Erro ao buscar trâmites:', error)
      throw error
    }
  }

  async getTramiteByID(id) {
    try {
      const { data } = await api.get(`/tramites/${id}`)
      return data
    } catch (error) {
      console.error(`Erro ao buscar trâmite com ID ${id}:`, error)
      throw error
    }
  }

  async addTramite(NovoTramite) {
    try {
      const { data } = await api.post('/tramites/', NovoTramite)
      return data
    } catch (error) {
      console.error('Erro ao adicionar trâmite:', error)
      throw error
    }
  }

  async atualizarTramite(id, TramiteAtt) {
    try {
      const { data } = await api.put(`/tramites/${id}/`, TramiteAtt)
      return data
    } catch (error) {
      console.error(`Erro ao atualizar trâmite com ID ${id}:`, error)
      throw error
    }
  }

  async attParcialmenteTramite(id, TramiteAtt) {
    try {
      const { data } = await api.patch(`/tramites/${id}/`, TramiteAtt)
      return data
    } catch (error) {
      console.error(`Erro ao atualizar parcialmente trâmite com ID ${id}:`, error)
      throw error
    }
  }

  async deletarTramite(id) {
    try {
      await api.delete(`/tramites/${id}/`)
    } catch (error) {
      console.error(`Erro ao deletar trâmite com ID ${id}:`, error)
      throw error
    }
  }
}

export default new TramiteService()