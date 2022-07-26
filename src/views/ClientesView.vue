<template>
  <div>
    <section id="fondito">
      <!--<img src="../../public/img/fondoVerResto.jpg" id="verRestoBack" />-->
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
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cliente, index) in clientes" v-bind:key="index">
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
                    @click="verDetalle(cliente._id)"
                    class="btn btn-secondary"
                  >
                    Ver
                  </button>
                </td>
                <td>
                  <button
                    v-if="esAdmin()"
                    @click="borrarResto(resto.address, index)"
                    class="btn btn-secondary"
                  >
                    Eliminar
                  </button>
                </td>
                <td>
                  <button
                    v-if="esAdmin()"
                    @click="modificarResto(index)"
                    class="btn btn-secondary"
                  >
                    Modificar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="modificar">
            <input v-model="modificarModel" /><button
              @click="confirmarModificacion()"
              class="btn btn-success"
            >
              Confirmar
            </button>
          </div>
        </div>
        <div class="col-2"></div>
    </section>
  </div>
</template>

<script>
import ClientesService from '../services/ClientesService.js';
export default {
  name: "CRUDClientes",
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
      modificarModel: "",
      indiceResto: -1,
      modificar: false,
      promedio: 0,
      restoAMod: {},
    };
  },
  methods: {
    verDetalle(idResto) {
      this.$router.push({ name: "DetalleResto", params: { id: idResto } });
    },
    calcularPromedio(resto) {
      if (resto.votersList.length > 0) {
        return Math.round((resto.points / resto.votersList.length) * 100) / 100;
      }
      return 0;
    },
    esAdmin() {
      //return this.$store.state.decodedUser.admin;
    },
    async borrarResto(address, indexResto) {
      await RestaurantesService.deleteRestaurante(address);
      this.restos.splice(indexResto, 1);
    },
    modificarResto(indexResto) {
      this.verInput();
      let r = this.restos[indexResto];
      this.indiceResto = indexResto;
      this.modificarModel = r.name;
      this.restoAMod = r;
    },
    verInput() {
      this.modificar = !this.modificar;
    },
    async confirmarModificacion() {
      this.restoAMod.name = this.modificarModel;
      await RestaurantesService.putRestaurante(this.restoAMod);
      this.verInput();
    },
  },
};
</script>
<style>
#fondito {
  
  background-color: #000000 !important;
}
/*#verRestoBack {
  position: absolute;
  opacity: 0.7;
  object-fit: cover;
  height: 650px;
  width: 100%;
  z-index: 1;
}*/

</style>