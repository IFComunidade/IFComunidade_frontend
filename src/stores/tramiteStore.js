import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import TramiteService from '@/services/tramiteService';

export const useTramiteStore = defineStore('tramite', () => {

  const tramite = ref({
    data: '',
    resposta: '',
    ocorrencia: '',
    autor: '',
  });

  const tramites = ref([]);
  const loading = ref(false);

  const isLoading = computed(() => loading.value);
  const TramiteCount = computed(() => tramites.value.length);

  const getTramites = async () => {
    loading.value = true;
    try {
      tramites.value = await TramiteService.getAllTramites();
    } catch (error) {
      console.error('Erro ao carregar trâmites:', error);
    } finally {
      loading.value = false;
    }
  }

  const addTramite = async (tramite) => {
    loading.value = true;
    try {
      const novoTramite = await TramiteService.addTramite(tramite);
      tramites.value.push(novoTramite);
    } catch (error) {
      console.error('Erro ao adicionar trâmite:', error);
    } finally {
      loading.value = false;
    }
  }

  const attTramite = async (id, tramiteAtt) => {
    loading.value = true;
    try {
      const tramiteAtualizado = await TramiteService.attTramite(id, tramiteAtt);
      const index = tramites.value.findIndex(t => t.id === id);
      if (index !== -1) {
        tramites.value[index] = tramiteAtualizado;
      }
    } catch (error) {
      console.error('Erro ao atualizar trâmite:', error);
    } finally {
      loading.value = false;
    }
  }

  const attParcialmenteTramite = async (id, tramiteAtt) => {
    loading.value = true;
    try {
      const tramiteAtualizado = await TramiteService.attParcialmenteTramite(id, tramiteAtt);
      const index = tramites.value.findIndex(t => t.id === id);
      if (index !== -1) {
        tramites.value[index] = tramiteAtualizado;
      }
    } catch (error) {
      console.error('Erro ao atualizar parcialmente trâmite:', error);
    } finally {
      loading.value = false;
    }
  }

  const deletarTramite = async (id) => {
    loading.value = true;
    try {
      await TramiteService.deletarTramite(id);
      tramites.value = tramites.value.filter(t => t.id !== id);
    } catch (error) {
      console.error('Erro ao deletar trâmite:', error);
    } finally {
      loading.value = false;
    }

  }

  return { tramite, tramites, isLoading, loading, TramiteCount, getTramites, addTramite, attTramite, attParcialmenteTramite, deletarTramite }

})
