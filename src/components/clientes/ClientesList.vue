<template>
  <div id="listado">
    <table class="table table-dark" id="tabla-clientes">
      <thead class="table-dark">
        <tr>
          <th>Alias</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>DNI</th>
          <th>Calle</th>
          <th>Altura</th>
          <th>Localidad</th>
          <th>Provincia</th>
          <th><i class="fa-solid fa-arrow-down"></i></th>
          <th><i class="fa-solid fa-arrow-down"></i></th>
          <th><i class="fa-solid fa-arrow-down"></i></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cliente, index) in listaClientes" v-bind:key="index">
          
          <td>{{ cliente.alias }}</td>
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.apellido }}</td>
          <td v-if="cliente.dni">{{ cliente.dni }}</td> <td v-else>-</td>
          <td>{{ cliente.direccion.calle }}</td>
          <td>{{ cliente.direccion.altura }}</td>
          <td>{{ cliente.localidad }}</td>
          <td>{{ cliente.provincia }}</td>

          <td>
            <button @click="$emit('verCliente', cliente)" class="btn btn-primary">
              Ver Detalle
            </button>
          </td>
          <td>
            <button @click="$emit('modCliente', cliente)" class="btn btn-secondary">
              Modificar
            </button>
          </td>
          <td>
            <button @click="$emit('borrarCliente', cliente)" class="btn btn-danger">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ClientesList",
  props: ['listaClientes'],
  data() {
    return {
      //clientes:[],
      //cliente:{}
    }
  },
  emits: ['verCliente', 'modCliente', 'borrarCliente'],
}
</script>

<style scoped>
#listado {
  width: auto;
}

#tabla-clientes {
  width: auto;
  border: 2px solid darkviolet;
  
}

#tabla-clientes td {
  text-align: center;
  width: auto;
  vertical-align: baseline;
}

#tabla-clientes th {
  text-align: center;
}

#tabla-clientes tbody tr:hover{
  background-color: blue !important;
  color:darkviolet;
  transition: 500ms;
}

</style>