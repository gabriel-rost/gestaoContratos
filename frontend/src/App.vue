<script setup>
import ContractForm from './components/ContractForm.vue';
import Contracts from './views/Contracts.vue';
import { RouterView } from 'vue-router';
import Modal from './components/Modal.vue';
</script>
<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li>
            <router-link to="/contratos">Visualizar Contratos</router-link>
          </li>
          <li>
            <router-link to="/upload">Upload de Contrato</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>
<script>
  export default {
    name: 'App',
  };
</script>
<style scoped>
  /* Estilos para o header e o menu de navegação */
  header {
    background-color: #4CAF50;
    color: white;
    padding: 10px 0;
    position: relative;
    top: 0;
    width: 100%;
    z-index: 1000;
  }

  nav {
    display: flex;
    justify-content: center;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  li {
    margin: 0 15px;
  }

  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Espaçamento para o conteúdo principal não ficar sob o header */
  main {
    padding-top: auto;
  }
</style>