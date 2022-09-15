<template>
  <div>
    <div class="pagination-row">
            <!--<td>
                <button class="pagination-button"
                    v-bind:disabled="pageNumber <= 1"
                    @click="cambiarPagina(1)">
                        <i class="bi bi-arrow-bar-left"></i>
                </button>
            </td>
            <td>
                <button class="pagination-button"
                    v-bind:disabled="pageNumber <= 1"
                    @click="cambiarPagina(pageNumber - 1)">
                        <i class="bi bi-arrow-left"></i>
                </button>
            </td>
            -->
            <tr>
                <td>
                    Registros por página:
                    <select name="selPageSize" id="selPageSize" style="padding:4px" v-model="perPage">
                        <option v-for="(item, index) in pageSizes" :key="index" :value="item">
                            {{item}}
                        </option>
                    </select>    
                </td>
                <td>
                    <button class="pagination-button"
                    v-bind:disabled="currentBatch <= 0"
                    @click="currentBatch -= 1">
                        Anteriores
                    </button>
                </td>
                <td>
                    <div v-if="numberPages <= 10">
                        <span v-for="(item, index) in new Array(numberPages)" :key="index">
                            <button v-bind:class="['pagination-button', pageNumber == index + 1 ? 'active' : '']"
                                @click="cambiarPagina(index + 1)">
                                    {{index + 1}}
                            </button>
                        </span>
                    </div>
                    <div v-else>
                        <span v-for="(item, index) in (lotes[currentBatch])" :key="index">
                            <button v-bind:class="['pagination-button', pageNumber == lotes[currentBatch][index] ? 'active' : '']"
                                @click="cambiarPagina(lotes[currentBatch][index])">
                                    {{lotes[currentBatch][index]}}
                            </button>
                        </span>
                    </div>
                </td>
                <td>
                    <button class="pagination-button"
                    v-bind:disabled="currentBatch >= lotes.length-1"
                    @click="currentBatch += 1">
                        Siguientes
                    </button>
                </td>
                <td>
                    Mostrando {{((this.pageNumber * this.perPage)-(this.perPage-1))}} al 
                    {{this.pageNumber == this.cantTotalPaginas ? (totalItems) : (this.pageNumber * this.perPage)}} 
                    de {{totalItems}} registros
                </td>
            </tr>
            <!--
            <td>
                <button class="pagination-button"
                    v-bind:disabled="pageNumber >= numberPages"
                    @click="cambiarPagina(pageNumber + 1)">
                        <i class="bi bi-arrow-right"></i>
                </button>
            </td>
            <td>
                <button class="pagination-button"
                    v-bind:disabled="pageNumber >= numberPages"
                    @click="cambiarPagina(numberPages)">
                        <i class="bi bi-arrow-bar-right"></i>
                </button>
            </td>
            -->
        <table style="margin-top: 1%">
            <tbody>
                <tr>
                    
                    
                </tr>
            </tbody>
        </table>
    </div>
    <slot name="data" :pageNumber="pageNumber">
        <!-- Some data could be loaded here -->
    </slot>
  </div>
</template>

<script>
export default {
    data(){
        return {
            currentBatch: 0, //es literalmente el lote actual de paginas de paginas a desplegar. Luego se usa como index
            lotes: [], //array de arrays que contiene las porciones de paginas de paginas. Ej: pag 1 a 10, pag 11 a 20.
            currentPages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], //array que contiene el batch de pagina de paginas a desplegar.
            pageNumber: 1, //numero de pagina actual
            perPage: 20, //cantidad de registros por pagina
            cantTotalPaginas: 0, //cantidad total de paginas. El calculo es: Math.ceil(cantTotalRegistros (se recibe por parametro) / cantRegistrosPorPagina (perPage))
            pageSizes : [20, 50, 100, 200], //las distintas cantidades de registros por pagina que el usuario puede seleccionar.
        }
    },
    created() {
        this.calculatePagesOfPages();
    },
    methods:{
        cambiarPagina(pagActual){
            this.pageNumber = Number(pagActual);
            this.EnviarPaginado()
        },
        EnviarPaginado(pagActual = null, tamanioPagina = null) {
            pagActual = (pagActual == null ? this.pageNumber : pagActual);
            tamanioPagina = (tamanioPagina == null ? this.perPage : tamanioPagina);
            console.log('Pagination.vue, tamanioPagina: '+tamanioPagina)
            this.$emit('sendPagination', Number(pagActual), Number(tamanioPagina));
        },
        calculatePagesOfPages(){
            if (this.totalItems == null || this.totalItems < 0) {throw new Error('totalItems no puede ser indefinida o menor a 0')}

            this.cantTotalPaginas = Math.ceil(this.totalItems / this.perPage);
            var paginasRestantes = this.cantTotalPaginas;
            var cantLotes = Math.ceil(this.cantTotalPaginas / 10); //10 es la cantidad de paginas (links) a mostrar
            var lotes2 = []; //para borrar despues
            var aux = 0; //los 10 que necesito para formar el array
            var auxArray = [];
            var aux2 = 1;
            var aux3 = 0;

            for (let index = 0; index < cantLotes; index++) {
                auxArray = new Array();
                if ((paginasRestantes - 10) < paginasRestantes && (paginasRestantes - 10) > 0) {
                    aux = 10;
                    paginasRestantes -= 10;
                } else {
                    aux = paginasRestantes;
                }
                
                //console.log('aux: '+aux)
                //console.log('aux2: '+aux2)
                aux3 = 0;

                do {
                    auxArray[aux3] = aux2;
                    aux2++;
                    aux3++;
                } while (aux3 < aux);

                //console.log('aux3: '+aux3)
                //console.log('auxArray: '+auxArray);
                lotes2[index] = auxArray;
            }
            console.log(lotes2)
            this.lotes = lotes2;
        }
    },
    watch: {
        perPage(newValue, oldValue) {
            this.calculatePagesOfPages();
            this.currentBatch = 0; //resteo a valor inicial
            this.pageNumber = 1; //resteo a valor inicial
            this.EnviarPaginado(1, newValue);
        },
        totalItems(){
            this.calculatePagesOfPages();
        }
    },
    computed:{
        numberPages(){
            return Math.ceil(this.totalItems / this.perPage);
        }
    },
    props: {
        totalItems: {
            type: Number,
            required: true
        },
    },
    emits:
        ['sendPagination']
    ,
}
</script>

<style lang="scss" scoped>
    .pagination-button{
        padding: 8px;
        margin: 2px;
        border-radius: 3px;
        font-size: 1em;
        cursor: pointer;
        &.active{
            background-color: #ccc;
            cursor: auto;
        }

        &:disabled{
            cursor: auto;
        }
    }
    .pagination-row{
        padding: 5px;
    }
    td{
        padding:1px;
        padding-left: 5px;
    }
</style>