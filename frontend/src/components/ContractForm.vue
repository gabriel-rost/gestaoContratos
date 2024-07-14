<template>
  <div>
    <h1>Upload de Contrato</h1>
    <form @submit.prevent="addContract" enctype="multipart/form-data">
      <div>
        <label for="titulo">Título do Contrato:</label>
        <input type="text" id="titulo" v-model="titulo" required>
      </div>
      <div>
        <label for="contrato_pdf">Arquivo do Contrato (PDF):</label>
        <input type="file" id="contrato_pdf" @change="handleFileUpload" accept="application/pdf" required>
      </div>
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      titulo: '',
      contrato_pdf: null
    };
  },
  methods: {
    handleFileUpload(event) {
      this.contrato_pdf = event.target.files[0];
    },
    async addContract() {
      const formData = new FormData();
      formData.append('titulo', this.titulo);
      formData.append('contrato_pdf', this.contrato_pdf);

      try {
        const response = await axios.post('http://localhost:3000/contratos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Contrato enviado com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao enviar o contrato:', error);
      }
    }
  }
};
</script>

<style scoped>  
  form {
    width: 300px;
    margin: 0 auto;
  }
  div {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input[type="text"],
  input[type="file"],
  button {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    box-sizing: border-box;
  }
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
</style>
