<template>
    <div id="listado">
    <section id="fondito">
        <div class="col-8 tabla">
          <table class="table table-dark table-striped tablaRestos">
            <thead class="table-dark">
              <tr>
                <th>Alias</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Dirección</th>
                <th>Localidad</th>
                <th>Provincia</th>
                <th>Referencia</th>
                <th>Cod Postal</th>
                <th>Cod Area</th>
                <th>Celular</th>
                <th>EMail</th>
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
                <td>{{ cliente.dni }}</td>
                <td>{{ cliente.direccion }}</td>
                <td>{{ cliente.localidad }}</td>
                <td>{{ cliente.provincia }}</td>
                <td>{{ cliente.referencia }}</td>
                <td>{{ cliente.cp }}</td>
                <td>{{ cliente.codArea }}</td>
                <td>{{ cliente.celular }}</td>
                <td>{{ cliente.email }}</td>
                <td>
                  <button
                    @click="$emit('verCliente',cliente)"
                    class="btn btn-primary"
                  >
                    Ver
                  </button>
                </td>
                <td>
                  <button
                    @click="$emit('modCliente',cliente)"
                    class="btn btn-secondary"
                  >
                    Modificar
                  </button>
                </td>
                <td>
                  <button
                    @click="$emit('borrarCliente',cliente.dni)"
                    class="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-2"></div>
    </section>
  </div>
</template>

<script>
    export default {
        name:"ClientesList",
        props:['listaClientes'],
        data(){
            return{
                //clientes:[],
                //cliente:{}
            }
        },
        emits:['verCliente','modCliente','borrarCliente'],
    }
</script>

<style lang="scss" scoped>

</style>