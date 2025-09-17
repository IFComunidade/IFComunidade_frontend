  import { ref, computed } from 'vue';
  import { defineStore } from 'pinia';
  import OcorrenciaService from '@/services/ocorrenciaService';
  import { useUserStore } from './userStore';



  export const useOcorrenciaStore = defineStore('ocorrencia', () => {

    const userStore = useUserStore();
    const ocorrencias = ref([]);
    const ocorrenciaSelecionada = ref({});
    const loading = ref(false);

    const ocorrencia = ref({
      id:'',
      imagem_attachment_key: null,
      tipo: null,
      titulo:'',
      texto: '',
      categoria: '',
      status: 1,
      anonima: true,
      setor: null,
      usuario: null,
    })

    const isLoading = computed(() => loading.value);
    const OcorrenciaCount = computed(() => ocorrencias.value.length);

    const getOcorrencias = async () => {
      loading.value = true;
      try {
        if(userStore.isLoggedIn) {
          ocorrencias.value = await OcorrenciaService.getAllOcorrencia();
        }
      } catch (error) {
        console.error('Erro ao carregar ocorrências:', error);
      } finally {
        loading.value = false;
      }
    }

    const getOcorrenciaById = async (id) => {
      loading.value = true;
      try {
        ocorrenciaSelecionada.value = await OcorrenciaService.getOcorrenciaById(id);
        console.log(ocorrenciaSelecionada.value)
      } catch (error) {
        console.error(`Erro ao carregar ocorrência com ID ${id}:`, error);
      } finally {
        loading.value = false;
      }
    }

    const addOcorrencia = async (ocorrencia) => {
      loading.value = true;
      try {
        const novaOcorrencia = await OcorrenciaService.addOcorrencia(ocorrencia);
        ocorrencias.value.push(novaOcorrencia);
      } catch (error) {
        console.error('Erro ao adicionar ocorrência:', error);
      } finally {
        loading.value = false;
      }
    }

    const attOcorrencia = async (id, ocorrenciaAtt) => {
      loading.value = true;
      try {
        const ocorrenciaAtualizada = await OcorrenciaService.attOcorrencia(id, ocorrenciaAtt);
        const index = ocorrencias.value.findIndex(o => o.id === id);
        if (index !== -1) {
          ocorrencias.value[index] = ocorrenciaAtualizada;
        }
      } catch (error) {
        console.error('Erro ao atualizar ocorrência:', error);
      } finally {
        loading.value = false;
      }
    }

    const attParcialmenteOcorrencia = async (id, ocorrenciaAtt) => {
      loading.value = true;
      try {
        const ocorrenciaAtualizada = await OcorrenciaService.attParcialmenteOcorrencia(id, ocorrenciaAtt);
        const index = ocorrencias.value.findIndex(o => o.id === id);
        if (index !== -1) {
          ocorrencias.value[index] = ocorrenciaAtualizada;
        }
      } catch (error) {
        console.error('Erro ao atualizar parcialmente ocorrência:', error);
      } finally {
        loading.value = false;
      }
    }

    const deletarOcorrencia = async (id) => {
      loading.value = true;
      try {
        await OcorrenciaService.deletarOcorrencia(id);
        ocorrencias.value = ocorrencias.value.filter(o => o.id !== id);
      } catch (error) {
        console.error('Erro ao deletar ocorrência:', error);
      } finally {
        loading.value = false;
      }

    }

    return { ocorrencias, ocorrencia, isLoading, loading, OcorrenciaCount, ocorrenciaSelecionada, getOcorrenciaById, getOcorrencias, addOcorrencia, attOcorrencia, attParcialmenteOcorrencia, deletarOcorrencia }

  })
