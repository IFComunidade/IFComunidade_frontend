import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import OpcaoService from '@/services/opcaoService';

export const useOpcaoStore = defineStore('opcao', () => {

    const opcoes = ref([]);
    const loading = ref(false);

    const isLoading = computed(() => loading.value);
    const OpcaoCount = computed(() => opcoes.value.length);

    const getOpcoes = async () => {
      loading.value = true;
      try {
        opcoes.value = await OpcaoService.getAllOpcao();
        console.log(opcoes.value)
      } catch (error) {
        console.error('Erro ao carregar opções:', error);
      } finally {
        loading.value = false;
      }
    }

    const addOpcao = async (opcao) => {
      loading.value = true;
      try {
        const novaOpcao = await OpcaoService.addOpcao(opcao);
        opcoes.value.push(novaOpcao);
      } catch (error) {
        console.error('Erro ao adicionar opção:', error);
      } finally {
        loading.value = false;
      }
    }

    const attOpcao = async (id, opcaoAtt) => {
      loading.value = true;
      try {
        const opcaoAtualizada = await OpcaoService.attOpcao(id, opcaoAtt);
        const index = opcoes.value.findIndex(o => o.id === id);
        if (index !== -1) {
          opcoes.value[index] = opcaoAtualizada;
        }
      } catch (error) {
        console.error('Erro ao atualizar opção:', error);
      } finally {
        loading.value = false;
      }
    }

    const attParcialmenteOpcao = async (id, opcaoAtt) => {
      loading.value = true;
      try {
        const opcaoAtualizada = await OpcaoService.attParcialmenteOpcao(id, opcaoAtt);
        const index = opcoes.value.findIndex(o => o.id === id);
        if (index !== -1) {
          opcoes.value[index] = opcaoAtualizada;
        }
      } catch (error) {
        console.error('Erro ao atualizar parcialmente opção:', error);
      } finally {
        loading.value = false;
      }
    }

    const deletarOpcao = async (id) => {
      loading.value = true;
      try {
        await OpcaoService.deletarOpcao(id);
        opcoes.value = opcoes.value.filter(o => o.id !== id);
      } catch (error) {
        console.error('Erro ao deletar opção:', error);
      } finally {
        loading.value = false;
      }
    }

    return { opcoes, isLoading, OpcaoCount, getOpcoes, addOpcao, attOpcao, attParcialmenteOpcao, deletarOpcao}
})
