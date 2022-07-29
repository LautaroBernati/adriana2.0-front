<template>
  
  <button
  id="btnCrear"
  class="btn btn-primary"
  v-on:click="crearCliente('')"
  v-if="mostrarLista">
    Crear Nuevo Cliente
  </button>
  
  <ClientesList
    id="clientes-list"
    v-bind:lista-clientes='clientes'
    v-on:verCliente="verDetalle"
    v-on:modCliente="modCliente"
    v-on:borrarCliente="borrCliente"
    v-if='mostrarLista'>
  </ClientesList>
  <ClienteDetalle 
    v-bind:cliente="cliente"
    v-bind:accion="accion"
    v-if="mostrarDetalle"
    v-on:aceptar="aceptar"
    v-on:cancelar="cancelar">
  </ClienteDetalle>

</template>

<script>
import ClientesList from '../components/clientes/ClientesList.vue';
import ClienteDetalle from '../components/clientes/ClienteDetalle.vue';
import ClientesService from '../services/ClientesService.js';

export default {
  name: "CRUDClientes",
  components:{
    ClientesList,
    ClienteDetalle,
    service:{}
  },
  async created() {
    this.service = new ClientesService(this.$store.getters.getToken);
    try{
      await this.service.getAllClientes()
        .then((data) => {
          this.clientes = data.data;
        });
    } catch(err){
      console.log(err.message);
    }
  },
  data() {
    return {
      clientes: [],
      cliente: {},
      mostrarLista: true,
      mostrarDetalle: false,
      accion: "",
    };
  },
  methods: {
    crearCliente(){
      console.log('entro');
      this.cliente = {
        direccion:{
          calle:"",
          altura:""
        }};
      this.accion = "crear";
      this.renderizarDetalle();
    },
    verDetalle(cliente) {
      this.cliente = cliente;
      this.accion = "ver";
      this.renderizarDetalle();
    },
    borrCliente(cliente) {
      this.cliente = cliente;
      this.accion = "borrar";
      this.renderizarDetalle();
    },
    modCliente(cliente) {
      this.cliente = cliente;
      this.accion = "editar";
      this.renderizarDetalle();
    },
    renderizarDetalle(){
      this.mostrarLista = false;
      this.mostrarDetalle = true;
    },
    async renderizarLista(){
      let data;
      this.mostrarLista = true;
      this.mostrarDetalle = false;
      data = await this.service.getAllClientes();
      this.clientes = data.data;
    },
    aceptar(){
      this.renderizarLista();
    },
    cancelar(){
      this.renderizarLista();
    },
  },
};
</script>
<style>
#clientes-list{
  text-align: -webkit-center;
  
}
#btnCrear{
  
  margin: 10px;
}

</style>