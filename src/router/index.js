import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MURALinterligaView from '@/views/MURALinterligaView.vue'
import CadastroView from '@/views/CadastroView.vue'
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
    path: '/Cadastro',
    name: 'Cadastro',
    component: CadastroView,
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
