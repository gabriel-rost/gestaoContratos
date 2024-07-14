<template>
  <div>
    <h1>Lista de Contratos</h1>
    <table>
      <thead class="tb">
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Descrição</th>
          <th>Data de Assinatura</th>
          <th>Data de Validade</th>
          <th>Status</th>
          <th>PDF</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contrato in contratos" :key="contrato.id" @click="openModal(contrato)">
          <td>{{ contrato.id }}</td>
          <td>{{ contrato.titulo }}</td>
          <td>{{ contrato.descricao }}</td>
          <td>{{ contrato.dataAssinatura }}</td>
          <td>{{ contrato.dataValidade }}</td>
          <td>{{ contrato.status }}</td>
          <td>
            <a :href="getPdfUrl(contrato.pdf)" target="_blank" @click.stop>Visualizar PDF</a>
          </td>
        </tr>
      </tbody>
    </table>
    <Modal :visible="isModalVisible" @close="closeModal">
      <div v-if="selectedContrato">
        <h1>Detalhes do Contrato</h1>
        <form @submit.prevent="updateContrato">
          <div>
            <label>Título:</label>
            <input v-model="selectedContrato.titulo" required />
          </div>
          <div>
            <label>Descrição:</label>
            <textarea v-model="selectedContrato.descricao"></textarea>
          </div>
          <div>
            <label>Data de Assinatura:</label>
            <input type="date" v-model="selectedContrato.dataAssinatura" />
          </div>
          <div>
            <label>Data de Validade:</label>
            <input type="date" v-model="selectedContrato.dataValidade" />
          </div>
          <div>
            <label>Status:</label>
            <input v-model="selectedContrato.status" />
          </div>
          <button type="submit">Salvar Alterações</button>
          <button @click="deleteContrato(selectedContrato.id)">Excluir</button>
        </form>
      </div>
    </Modal>
  </div>
</template>
<script>
    import axios from 'axios';
    // Importando o componente modal. Para exibir e editar as informações de um determinado contrato
    import Modal from '../components/Modal.vue';
    export default {
    components: {
        Modal
    },
    data() {
        return {
        contratos: [],
        isModalVisible: false,
        selectedContrato: null
        };
    },
    created() {
        this.fetchContratos();
    },
    methods: {
        async fetchContratos() {
        try {
            const response = await axios.get('http://localhost:3000/contratos');
            this.contratos = response.data;
        } catch (error) {
            console.error('Erro ao buscar contratos:', error);
            alert("Verifique sua conexão");
        }
        },
        openModal(contrato) {
        this.selectedContrato = { ...contrato }; // Copia o contrato para evitar mutação direta
        this.isModalVisible = true;
        },
        closeModal() {
        this.isModalVisible = false;
        this.selectedContrato = null;
        },
        async updateContrato() {
        try {
            await axios.put(`http://localhost:3000/contratos/${this.selectedContrato.id}`, this.selectedContrato);
            this.fetchContratos(); // Atualiza a lista de contratos
            this.closeModal(); // Fecha o modal após a atualização
        } catch (error) {
            console.error('Erro ao atualizar contrato:', error);
        }
        },
        async deleteContrato(id) {
        const confirmDelete = confirm("Você tem certeza que deseja excluir este contrato?");
        if (confirmDelete) {
          try {
          await axios.delete(`http://localhost:3000/contratos/${id}`);
          this.contratos = this.contratos.filter(contrato => contrato.id !== id);
          this.closeModal(); // Fecha o modal após a exclusão
          } catch (error) {
          console.error('Erro ao excluir contrato:', error);
          }
        }
        },
        getPdfUrl(pdfPath) {
        return `http://localhost:3000/${pdfPath}`;
        }
    }
    };
</script>
<style scoped>
    table {
        width: 100%;
        border-collapse: collapse;
    }
        th, td {
        padding: 12px;
        border: 1px solid #ddd;
        text-align: left;
    }
    .tb {
        background-color: #4CAF50;
    }
    tbody tr {
        cursor: pointer;
    }
    tbody tr:hover {
        background-color: #04274c;
    }
</style>
  
  

  