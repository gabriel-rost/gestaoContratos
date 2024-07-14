<template>
    <div class="modal" v-if="visible">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <slot></slot>
      </div>
    </div>
  </template>
<script>
    export default {
        props: {
            visible: {
            type: Boolean,
            required: true
            }
        },
        methods: {
            closeModal() {
            this.$emit('close');
            }
        }
    };
</script>
<style scoped>
  .modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }
  
  .modal-content {
    background-color: #000000;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  
  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: rgb(204, 35, 35);
    text-decoration: none;
    cursor: pointer;
  }
</style>
  