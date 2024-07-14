//console.log("configurar rotas de páginas");

// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '../views/NotFound.vue';
import ContractForm from '../components/ContractForm.vue';
import Contracts from '../views/Contracts.vue';
import Modal from '../components/Modal.vue';

const routes = [
  { path: '/', name: 'contratos', component: Contracts },
  { path: '/contratos', name: 'Contracts', component: () => import('../views/Contracts.vue') },
  { path: '/upload', name: 'ContractForm', component: ContractForm},
  { path: '/:pathMatch(.*)*', name: "NotFound", component: NotFound},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
