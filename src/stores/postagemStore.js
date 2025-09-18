import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import PostagemService from '@/services/postagemService';

export const usePostagemStore = defineStore('postagem', () => {
    const postagem = ref({
    imagem: null,
    titulo: '',
    descricao: '',
    data: '',
    usuario: null,
  });

    const postagens = ref([]);
    const loading = ref(false);

    const isLoading = computed(() => loading.value);
    const PostagemCount = computed(() => postagens.value.length);

    const getPostagens = async () => {
      loading.value = true;
      try {
        postagens.value = await PostagemService.getAllPostagem();
      } catch (error) {
        console.error('Erro ao carregar postagens:', error);
      } finally {
        loading.value = false;
      }
    }

    const addPostagem = async (postagem) => {
      loading.value = true;
      try {
        const novaPostagem = await PostagemService.addPostagem(postagem);
        postagens.value.push(novaPostagem);
      } catch (error) {
        console.error('Erro ao adicionar ocorrência:', error);
      } finally {
        loading.value = false;
      }
    }

    const attPostagem = async (id, postagemAtt) => {
      loading.value = true;
      try {
        const postagemAtualizada = await PostagemService.attPostagem(id, postagemAtt);
        const index = postagens.value.findIndex(p => p.id === id);
        if (index !== -1) {
          postagens.value[index] = postagemAtualizada;
        }
      } catch (error) {
        console.error('Erro ao atualizar postagem:', error);
      } finally {
        loading.value = false;
      }
    }

    const attParcialmentePostagem = async (id, postagemAtt) => {
      loading.value = true;
      try {
        const postagemAtualizada = await PostagemService.attParcialmentePostagem(id, postagemAtt);
        const index = postagens.value.findIndex(p => p.id === id);
        if (index !== -1) {
          postagens.value[index] = postagemAtualizada;
        }
      } catch (error) {
        console.error('Erro ao atualizar parcialmente postagem:', error);
      } finally {
        loading.value = false;
      }
    }

    const deletarPostagem = async (id) => {
      loading.value = true;
      try {
        await PostagemService.deletarPostagem(id);
        postagens.value = postagens.value.filter(p => p.id !== id);
      } catch (error) {
        console.error('Erro ao deletar postagem:', error);
      } finally {
        loading.value = false;
      }

    }

    return { postagem, postagens, isLoading, loading, PostagemCount, getPostagens, addPostagem, attPostagem, attParcialmentePostagem, deletarPostagem }
})
