<template>
  <ClientesList
    v-bind:listaClientes='clientes'
    v-on:verCliente="verDetalle"
    v-on:modCliente="modCliente"
    v-on:borrarCliente="borrCliente"
    v-if='mostrarLista'>
  </ClientesList>
  <ClienteDetalle 
    v-bind:cliente="cliente"
    v-if="mostrarDetalle">
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
    ClienteDetalle
  },
  created() {
    const service = new ClientesService(this.$store.getters.getToken);
    try{
      service.getAllClientes()
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
    };
  },
  methods: {
    verDetalle(cliente) {
      this.cliente = cliente;
      this.renderizarDetalle();
      //console.log('entra\n' + JSON.stringify(cliente));
      //this.$router.push({ name: "DetalleResto", params: { id: idResto } });
    },
    borrCliente(cliente) {
      console.log('borrar tal y tal')
      //await RestaurantesService.deleteRestaurante(address);
      //this.restos.splice(indexResto, 1);
    },
    modCliente(cliente) {
      console.log('modificar tal y cual')
      
    },
    renderizarDetalle(){
      this.mostrarLista = false;
      this.mostrarDetalle = true;
    },
    renderizarLista(){
      this.mostrarLista = true;
      this.mostrarDetalle = false;
    }
  },
};
</script>
<style>
#fondito { 
  background-color: #000000 !important;
}

</style>