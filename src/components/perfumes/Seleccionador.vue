<template>
    <div>
        <div id="recuadroSeleccionador">
            <div>
                <tr>
                    <td id="tdInpBuscadorCr" style="width: 20%;">
                        <label for="">Filtrar creador</label>
                        <select class="form-select" aria-label="Seleccionar un Creador" name="selCreator" id="selCreator"
                        v-model="vueTable.filterCreator">
                            <option selected disabled value="-1">Seleccionar un Creador</option>
                            <option value="Armani">Armani</option>
                            <option value="Christian Dior">Christian Dior</option>
                        </select>
                    </td>
                    <td id="tdInpBuscador" style="width: 30%;">
                        <label for="">Buscar por perfume</label>
                        <input type="text" id="inpBuscador" class="form-control" placeholder="Buscar un perfume"
                        data-toggle="tooltip" data-placement="top" title="Buscar fragancia" v-model="vueTable.filterFragrance">
                    </td>
                    <td style="width: 30%">
                        <label for="">Filtrar genero</label>
                        <select class="form-select" aria-label="Seleccionar un Genero" name="selGender" id="selGender" 
                        v-model="vueTable.filterGender">
                            <option selected disabled value="-1">Seleccionar un Genero</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                    </td>
                    <td id="tdBtnBuscar" style="text-align: center; vertical-align: middle;">
                        <button class="btn btn-success" id="btnBuscar" @click="buscarPerfume">Buscar</button>
                    </td>
                </tr>
            </div>
            <div v-if="listaIsDisabled === false" class="list-group" id="listitaList">
                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Creador</th>
                            <th>Fragancia</th>
                            <th>Sexo</th>
                            <th>Precio 100ml</th>
                            <th>Precio 60ml</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in items" v-bind:key='index'>
                            <td>{{item.idPerfume}}</td>
                            <td>{{item.creator}}</td>
                            <td>{{item.fragrance}}</td>
                            <td>{{item.gender}}</td>
                            <td>{{item.price100ml}}</td>
                            <td>{{item.price60ml}}</td>
                            <td>
                                <button class="btn btn-secondary" @click="traerPerfume(item)">Traer</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <p>Cargando datos...</p>
            </div>
            <div class="vuetable-panel-final">
                <button class="btn btn-secondary">asdasd</button>
            </div>
            
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
var service;
export default {
    async created(){
            try{
                service = new PerfumesService(this.$store.getters.getToken);
                let pagination = {
                    pageSize: 10,
                    page: 1
                };
                let filter = {
                    creator: "Armani",
                    fragrance: "Si",
                    gender: "Femenino"
                };
                this.buscarPerfume(pagination, filter);
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
    data() {
        return {
            items: [],
            resultados: [],
            listaIsDisabled: true,
            perfume: {},
            cant: 1,
            medioPago: "Efectivo/Transferencia",
            medida: "100mL",
            vueTable: {
                page: 1,
                pageSize: 10,
                pageSizes : [10, 20, 30, 50, 100, 200],
                filterCreator: "",
                filterFragrance:"",
                filterGender: "",
            },

        }
    },
    methods:{
        async buscarPerfume(pagination, filter = null) {
                this.resetListaLocal();

                let data = await service.getPerfumesPaginated(pagination, filter);
                this.items = data.data.Contenido;

                /*let filtered = this.items[0].fragrance.replace(/\D+/g, ' ').trim().split(' ').map(e => parseInt(e));
                console.log(filtered);
                return null;
                let array1 = ( this.items.filter(item => {
                return this.queryParam
                    .toLowerCase()
                    .split(" ")
                    .every(v => item.fragrance.toLowerCase().includes(v));
                }) );
                this.items = array1;*/
                
            },
        resetListaLocal(){
            this.items = this.resultados;
        },
        traerPerfume(item){
            this.perfume = item;
            this.calcularPrecio(null);
        },
        calcularPrecio(event){
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
    height: 250px;
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