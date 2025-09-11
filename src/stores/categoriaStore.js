import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import CategoriaService from '@/services/categoriaService';

export const useCategoriaStore = defineStore('categoria', () => {

    const categorias = ref([]);
    const loading = ref(false);

    const isLoading = computed(() => loading.value);
    const CategoriaCount = computed(() => categorias.value.length);

    const getCategorias = async () => {
      loading.value = true;
      try {
        categorias.value = await CategoriaService.getAllCategorias();
        console.log(categorias.value)
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      } finally {
        loading.value = false;
      }
    }

    const addCategoria = async (categoria) => {
      loading.value = true;
      try {
        const novaCategoria = await CategoriaService.addCategoria(categoria);
        categorias.value.push(novaCategoria);
      } catch (error) {
        console.error('Erro ao adicionar categoria:', error);
      } finally {
        loading.value = false;
      }
    }

    const attCategoria = async (id, categoriaAtt) => {
      loading.value = true;
      try {
        const categoriaAtualizada = await CategoriaService.attCategoria(id, categoriaAtt);
        const index = categorias.value.findIndex(c => c.id === id);
        if (index !== -1) {
          categorias.value[index] = categoriaAtualizada;
        }
      } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
      } finally {
        loading.value = false;
      }
    }

    const attParcialmenteCategoria = async (id, categoriaAtt) => {
      loading.value = true;
      try {
        const categoriaAtualizada = await CategoriaService.attParcialmenteCategoria(id, categoriaAtt);
        const index = categorias.value.findIndex(c => c.id === id);
        if (index !== -1) {
          categorias.value[index] = categoriaAtualizada;
        }
      } catch (error) {
        console.error('Erro ao atualizar parcialmente categoria:', error);
      } finally {
        loading.value = false;
      }
    }

    const deletarCategoria = async (id) => {
      loading.value = true;
      try {
        await CategoriaService.deletarCategoria(id);
        categorias.value = categorias.value.filter(c => c.id !== id);
      } catch (error) {
        console.error('Erro ao deletar categoria:', error);
      } finally {
        loading.value = false;
      }

    }

    return { categorias, isLoading, loading, CategoriaCount, getCategorias, addCategoria, attCategoria, attParcialmenteCategoria, deletarCategoria }
})
