import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MURALinterligaView from '@/views/MURALinterligaView.vue'
import CadastroView from '@/views/CadastroView.vue'
import LoginView from '@/views/LoginView.vue'
import OuvidoriaAdministrativaView from '@/views/OuvidoriaAdministrativaView.vue'
import PerfilView from '@/views/PerfilView.vue'
import OuvidoriaView from '@/views/OuvidoriaView.vue'
import OcorrenciaView from '@/views/OcorrenciaView.vue'
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
    },
    {
    path: '/Login',
    name: 'Login',
    component: LoginView,
    },
    {
    path: '/OuvidoriaAdministrativa',
    name: 'OuvidoriaAdministrativa',
    component: OuvidoriaAdministrativaView,
    },
    {
    path: '/Perfil',
    name: 'Perfil',
    component: PerfilView,
    },
    {
    path: '/Ouvidoria',
    name: 'Ouvidoria',
    component: OuvidoriaView,
    },
    {
      path: '/Ocorrencias',
      name: 'Ocorrencias',
      component: OcorrenciaView,
    },
    {
      path: '/DadosPessoais',
      name: 'DadosPessoais',
      component: DadosPessoaisView,
    },
    {
    path: '/playground',
    name: 'playground',
    component: () => import('@/utils/PlayGround.vue'),
    },
  ],
})

export default router
