<template>
    <div>
        <div id="recuadroSeleccionador">

            <tr>
                <td id="tdInpBuscadorCr" style="width: 20%;">
                    <label for=""><b>Filtrar creador</b></label>
                    <select class="form-select" aria-label="Seleccionar un Creador" name="selCreator" id="selCreator"
                    v-model="vueTable.filterCreator">
                        <option v-for="(item, index) in vueTable.creators" :key="index" :value="item">
                            {{vueTable.creators[index]}}
                        </option>
                    </select>
                </td>
                <td id="tdInpBuscador" style="width: 30%;">
                    <label for=""><b>Buscar por perfume</b></label>
                    <input type="text" id="inpBuscador" class="form-control" placeholder="Buscar un perfume"
                    data-toggle="tooltip" data-placement="top" title="Buscar fragancia" v-model="vueTable.filterFragrance">
                </td>
                <td style="width: 30%">
                    <label for=""><b>Filtrar género</b></label>
                    <select class="form-select" aria-label="Seleccionar un Genero" name="selGender" id="selGender" 
                    v-model="vueTable.filterGender">
                        <option selected disabled value="-1">Seleccionar un Género</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </td>
                <td id="tdBtnBuscar" style="text-align: center; vertical-align: middle;">
                    <button class="btn btn-success" id="btnBuscar" @click="buscarPerfume">Buscar</button>
                </td>
                <td id="tdBtnBorrarFiltros" style="text-align: center; vertical-align: middle;">
                    <button class="btn btn-danger" id="btnBorrarFiltros" @click="borrarFiltros">Borrar Filtros</button>
                </td>
            </tr>

            <div v-if="listaIsDisabled === false">
                <VTable
                    :fields="testFields"
                    :items="items"
                    :quantityOfRecords="vueTable.totalRecords"
                    @customEvent="receiveCustomEvent"
                    @pagination="receivePagination">
                </VTable>    
            </div>
            <div v-else>
                <p>Cargando datos...</p>
            </div>

            <hr>

            <tr id="selRow">
                <td>
                <label class="" for="cantidad">Cantidad</label>
                <input type="number" class="form-control mb-2 mr-sm-2 text-center" id="inputCant" min="1" max="20" v-model="item.cantidad">
                </td>

                <td>
                    <label class="" for="creador">----- Creador / Fragancia -----</label>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">{{item.articulo.creator}}</div>
                        </div>
                        <input type="text" class="form-control" id="inputFrag" placeholder="Fragancia" :value="item.articulo.fragrance">
                    </div>
                </td>

                <td>
                    <label class="" for="genero">Sexo</label>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">{{item.articulo.gender}}</div>
                        </div>
                    </div>
                </td>

                <td>
                    <label class="" for="inlineFormCustomSelectPref">Medida (en mL)</label>
                    <select class="form-select text-center" id="inlineFormCustomSelectPref" v-model="item.articulo.medida">
                        <option :value="100" selected>100</option>
                        <option :value="60">60</option>
                    </select>
                </td>
                <td>
                    <label class="" for="inlineFormCustomSelectPref">Medio Pago</label>
                    <select class="form-select" id="inlineFormCustomSelectPref" v-model="item.articulo.medioPago">
                        <option value="Efectivo/Transferencia" selected>Efectivo/Transferencia</option>
                        <option value="MercadoPago" selected>MercadoPago</option>
                </select>
                </td>
                
                <td>
                    <label class="" for="precio">Precio</label>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">$ {{item.calcularPrecio()}}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <label class="" for=""></label>
                    <div>
                        <!--<button class="btn btn-primary mb-2" v-on:click="$emit('aplicar', perfume, cant, medida, medioPago)">Aplicar</button>-->
                        <button class="btn btn-primary mb-2" v-on:click="enviarProducto(this.item)">Aplicar</button>
                    </div>
                </td>
            </tr>
            
            <div>
                <tr>
                    <td>
                        <label class="" for="cantidad">Cantidad</label>
                        <input type="number" class="form-control mb-2 mr-sm-2" id="inputCantEnvios" min="1" max="10" v-model="datosEnvio.cant">
                    </td>

                    <td>
                        <label class="" for="inlineFormCustomSelectPref">Tipo de Envio</label>
                        <select class="form-select mb-2 mr-sm-2" id="inlineFormCustomSelectPref" v-model="datosEnvio.tipoEnvio">
                            <option value="A Domicilio" selected>A Domicilio</option>
                            <option value="A Sucursal">A Sucursal</option>
                            <option value="Moto">Moto</option>
                        </select>
                    </td>
                    
                    
                    <td>
                        <label class="" for="precioDeEnvio">Precio</label>
                        <input type="number" class="form-control mb-2 mr-sm-2" id="inputPrecioEnvio" min="1" v-model="datosEnvio.precio">
                    </td>
                    <td>
                        <label class="" for=""></label>
                        <div>
                            <button class="btn btn-primary mb-2" v-on:click="crearEnvio">Aplicar</button>
                        </div>
                    </td>
                </tr>
            </div>
        </div>
        
    </div>
</template>

<script>
import Item from '../../domain/Composite/Item.js';
import Envio from '../../domain/Composite/Envio.js';
import PerfumesService from '../../services/PerfumesService.js';
import Pagination from '../VSTable/Pagination.vue';
import VTable from '../VSTable/VTable.vue';
import Perfume from '../../domain/Composite/Perfume.js';
var service;
export default {
    async created(){
            try{
                service = new PerfumesService(this.$store.getters.getToken);
                let initialPagination = {
                    pageSize: 20,
                    page: 1
                };
                await this.buscarPerfume();
                let request = await service.getAllCreators();
                this.vueTable.creators = request.data;
                this.listaIsDisabled = false; //tuve que llegar a esto para que el componente respete el asincronismo de getAllPerfumes
            } catch(e){
                console.log(e.message);
                this.$swal.fire({
                    icon: 'error',
                    title: 'Error al conectar al servidor',
                    text: 'Falló la conexión',
                });
            }
    },
    components:{
        Pagination,
        VTable
    },
    data() {
        return {
            name: 'SeleccionadorComponent',
            items: [],
            resultados: [],
            listaIsDisabled: true,
            item: new Item(new Perfume(0, "Algo", "", "", 100, 0, 0, ""), 1),
            cant: 1,
            datosEnvio:{
                cant: 1,
                tipoEnvio: "A Domicilio",
                precio: 700,
            },
            vueTable: {
                page: 1,
                pageSize: 20,
                filterCreator: "",
                filterFragrance:"",
                filterGender: "",
                totalRecords: 0,
                creators: []
            },
            testFields: [
                {
                    title: 'ID',
                    key: true,
                    sorting: false,
                    listClass: 'text-center',
                    display(data){
                        return data.idPerfume
                    }
                },
                {
                    title: 'Creador',
                    sorting: false,
                    listClass: 'text-center',
                    display(data){
                        return data.creator;
                    }
                },
                {
                    title: 'Fragancia',
                    sorting: false,
                    listClass: 'text-center',
                    display(data){
                        return data.fragrance;
                    }
                },
                {
                    title: 'Sexo',
                    sorting: false,
                    listClass: 'text-center',
                    display(data){
                        return data.gender;
                    }
                },
                {
                    title: 'Precio 100ml',
                    sorting: false,
                    listClass: 'text-center',
                    display(data){
                        return data.price100ml;
                    }
                },
                {
                    title: 'Precio 60ml',
                    sorting: false,
                    listClass: 'text-center',
                    display(data){
                        return data.price60ml;
                    }
                },
                {
                    title: 'Boton',
                    width: '2%',
                    sorting: false,
                    listClass: 'text-center',
                    generatesCustomEvent: true,
                    display(data){
                        return '<button class="btn btn-secondary">Seleccionar</button>';
                    }
                },
            ]
        }
    },
    methods:{
        receivePagination(pagination){
            this.vueTable.page = pagination.page;
            this.vueTable.pageSize = pagination.pageSize;
            
            this.buscarPerfume(null, pagination);
        },
        receiveCustomEvent(data){
            //console.log('PARENT Seleccionador: Recibo objeto '+JSON.stringify(data))
            this.crearPerfume(data);
        },
        async buscarPerfume(event = null, pagination = null, filter = null) {
                this.resetListaLocal();
                pagination = pagination == null ? {page: this.vueTable.page, pageSize: this.vueTable.pageSize} : pagination;

                if (filter == null) {
                    filter = {};
                    (this.vueTable.filterCreator != "") ? filter.creator = this.vueTable.filterCreator : filter.creator='';
                    (this.vueTable.filterFragrance != "") ? filter.fragrance = this.vueTable.filterFragrance : filter.fragrance='';
                    (this.vueTable.filterGender != "") ? filter.gender = this.vueTable.filterGender : filter.gender='';
                }

                let data = await service.getPerfumesPaginated(pagination, filter);
                this.items = data.data.Contenido;
                this.vueTable.totalRecords = data.data.TotalRegistros;
            },
        resetListaLocal(){
            this.items = this.resultados;
        },
        borrarFiltros(){
            this.vueTable.filterCreator = "";
            this.vueTable.filterFragrance = "";
            this.vueTable.filterGender = "";
            this.buscarPerfume();
        },
        crearPerfume(data){
            this.item.articulo = new Perfume(data._id, data.creator, data.fragrance, data.gender, 100, data.price100ml, data.price60ml, "Efectivo/Transferencia");
        },
        crearEnvio(e = null){
            e.preventDefault();
            let envio = new Envio(this.datosEnvio.precio, this.datosEnvio.cant, this.datosEnvio.tipoEnvio);
            this.enviarProducto(envio);
        },
        enviarProducto(producto){
            if (!producto) {throw new Error('Cannot create null Producto');}
            this.$emit('aplicar', producto);
        }
    },
    emits:
        ['aplicar']
    ,
}
</script>

<style scoped>
#recuadroSeleccionador{
    margin: 2%;
    background-color: rgb(234, 234, 234);
    border: 2px solid lightgrey;
    border-radius: 3px;
    padding: 10px;
    text-align: -webkit-center;
}
#selRow{
    margin: auto;
}
td{
    padding-right: 10px;
}
#listitaList{
    margin-top: 1%;
    overflow-y: scroll;
    height: 450px;
    font-size: large;
    text-align: center;
}
#listitaList tbody tr{
    transition: all 0.2s ease-in-out;
}
#listitaList tbody tr:hover{
    color:darkviolet;
    transition: all 0.5s ease-in-out;
}
</style>