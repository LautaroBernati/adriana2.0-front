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
                <input type="number" class="form-control mb-2 mr-sm-2" id="inputCant" min="1" max="20" v-model="cant" @change="calcularPrecio($event)">
                </td>

                <td>
                    <label class="" for="creador">----- Creador / Fragancia -----</label>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">{{perfume.creator}}</div>
                        </div>
                        <input type="text" class="form-control" id="inputFrag" placeholder="Fragancia" :value="perfume.fragrance">
                    </div>
                </td>

                <td>
                    <label class="" for="genero">Sexo</label>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">{{perfume.gender}}</div>
                        </div>
                    </div>
                </td>

                <td>
                    <label class="" for="inlineFormCustomSelectPref">Medida</label>
                    <select class="form-select" id="inlineFormCustomSelectPref" @change="calcularPrecio($event)" v-model="medida">
                        <option value="100mL" selected>100mL</option>
                        <option value="60mL">60mL</option>
                    </select>
                </td>
                <td>
                    <label class="" for="inlineFormCustomSelectPref">Medio Pago</label>
                    <select class="form-select" id="inlineFormCustomSelectPref" @change="calcularPrecio($event)" v-model="medioPago">
                        <option value="Efectivo/Transferencia" selected>Efectivo/Transferencia</option>
                        <option value="MercadoPago" selected>MercadoPago</option>
                </select>
                </td>
                
                <td>
                    <label class="" for="precio">Precio</label>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">$ {{perfume.price}}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <label class="" for=""></label>
                    <div>
                        <button class="btn btn-primary mb-2" v-on:click="$emit('aplicar', perfume, cant, medida, medioPago)">Aplicar</button>
                    </div>
                    
                </td>
                
            </tr>
        </div>
        
    </div>
</template>

<script>
import PerfumesService from '../../services/PerfumesService.js';
import Pagination from '../VSTable/Pagination.vue';
import VTable from '../VSTable/VTable.vue';
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
            perfume: {},
            cant: 1,
            medioPago: "Efectivo/Transferencia",
            medida: "100mL",
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
            console.log('PARENT Seleccionador: Recibo pagination: ' + JSON.stringify(pagination))
            this.vueTable.page = pagination.page;
            this.vueTable.pageSize = pagination.pageSize;
            
            this.buscarPerfume(null, pagination);
        },
        receiveCustomEvent(data){
            console.log('PARENT Seleccionador: Recibo objeto '+JSON.stringify(data))
            this.perfume = data;
            this.calcularPrecio();
        },
        async buscarPerfume(event = null, pagination = null, filter = null) {
                this.resetListaLocal();
                console.log('pagination? '+pagination)
                
            
                pagination = pagination == null ? {page: this.vueTable.page, pageSize: this.vueTable.pageSize} : pagination;

                if (filter == null) {
                    filter = {};
                    (this.vueTable.filterCreator != "") ? filter.creator = this.vueTable.filterCreator : filter.creator='';
                    (this.vueTable.filterFragrance != "") ? filter.fragrance = this.vueTable.filterFragrance : filter.fragrance='';
                    (this.vueTable.filterGender != "") ? filter.gender = this.vueTable.filterGender : filter.gender='';
                }
                console.log('filter? '+JSON.stringify(filter))

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
        calcularPrecio(event = null){
            this.perfume.price = 0;
            
            if(this.medida == "100mL" && this.medioPago == "Efectivo/Transferencia"){
                this.perfume.price = Number(this.perfume.price100ml);
            } else if(this.medida == "60mL" && this.medioPago == "Efectivo/Transferencia"){
                this.perfume.price = Number(this.perfume.price60ml);
            } else if(this.medida == "100mL" && this.medioPago == "MercadoPago"){
                this.perfume.price = Number(this.perfume.price100ml*0.20+this.perfume.price100ml);
            } else if(this.medida == "60mL" && this.medioPago == "MercadoPago"){
                this.perfume.price = Number(this.perfume.price60ml*0.20+this.perfume.price60ml);
            } else {
                this.perfume.price = 0;
            }
            this.perfume.price = Number(this.perfume.price * this.cant);
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