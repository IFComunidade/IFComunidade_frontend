import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MURALinterligaView from '@/views/MURALinterligaView.vue'
import CadastroAlunoView from '@/views/CadastroAlunoView.vue'
import CadastroSetorView from '@/views/CadastroSetorView.vue'
import LoginView from '@/views/LoginView.vue'
import ListagemOcorrenciaView from '@/views/ListagemOcorrenciaView.vue'
import RegistrarOcorrenciaView from '@/views/RegistrarOcorrenciaView.vue'
import CadastroPostagem from '@/views/CadastroPostagem.vue'
import DadosDaOcorrencia from '@/views/DadosDaOcorrencia.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/',
    name: 'Home',
    component: HomeView,
    },
    {
    path: '/MURALinterliga',
    name: 'MURALinterliga',
    component: MURALinterligaView,
    },
    {
      path: '/Criar/Postagem',
      name: 'CriarPostagem',
      component: CadastroPostagem,
    },
    {
    path: '/Cadastro/Aluno',
    name: 'CadastroAluno',
    component: CadastroAlunoView,
    meta: { hideLayout: true },
    },
    {
    path: '/Cadastro/Setor',
    name: 'CadastroSetor',
    component: CadastroSetorView,
    meta: { hideLayout: true },
    },
    {
    path: '/Login',
    name: 'Login',
    component: LoginView,
    meta: { hideLayout: true },
    },
    {
    path: '/ListagemOcorrencia',
    name: 'ListagemOcorrencia',
    component: ListagemOcorrenciaView,
    },
    {
      path: '/RegistrarOcorrencia',
      name: 'RegistrarOcorrencia',
      component: RegistrarOcorrenciaView,
    },
    {
      path: '/ListagemOcorrencia/:id',
      name: 'Ocorrencia',
      component: DadosDaOcorrencia,
      props: true,
    }
  ],
})

export default router
