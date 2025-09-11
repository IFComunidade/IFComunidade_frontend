import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MURALinterligaView from '@/views/MURALinterligaView.vue'
import CadastroAlunoView from '@/views/CadastroAlunoView.vue'
import CadastroSetorView from '@/views/CadastroSetorView.vue'
import LoginView from '@/views/LoginView.vue'
import ListagemOcorrenciaSetorView from '@/views/ListagemOcorrenciaSetorView.vue'
import PerfilView from '@/views/PerfilView.vue'
import ListagemOcorrenciaAlunoView from '@/views/ListagemOcorrenciaAlunoView.vue'
import RegistrarOcorrenciaView from '@/views/RegistrarOcorrenciaView.vue'
import DadosPessoaisView from '@/views/DadosPessoaisView.vue' 

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
    },
    {
    path: '/ListagemOcorrenciaSetor',
    name: 'ListagemOcorrenciaSetor',
    component: ListagemOcorrenciaSetorView,
    },
    {
    path: '/Perfil',
    name: 'Perfil',
    component: PerfilView,
    },
    {
    path: '/ListagemOcorrenciaAluno',
    name: 'ListagemOcorrenciaAluno',
    component: ListagemOcorrenciaAlunoView,
    },
    {
      path: '/RegistrarOcorrencia',
      name: 'RegistrarOcorrencia',
      component: RegistrarOcorrenciaView,
    },
    {
      path: '/DadosPessoais',
      name: 'DadosPessoais',
      component: DadosPessoaisView,
    }
  ],
})

export default router
