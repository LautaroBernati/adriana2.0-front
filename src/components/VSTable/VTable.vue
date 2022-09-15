<template>
        <div id="VTable">
            <div v-if="listaIsDisabled === false" class="list-group" id="VTable-list">
                <table class="table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th v-for="(field, index) in fields" :key="index">
                                {{fields[index].title}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in items" v-bind:key='index'>
                            <td v-for="(col, index) in fields" :key="index" v-html="col.display(item)" v-on:click="(col.generatesCustomEvent ? captureData(item) : '')" style="vertical-align:middle">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <p>Cargando datos...</p>
            </div>
            <div v-if="enablePagination === true" class="VTable-Pagination-Row">
                <Pagination 
                :totalItems="quantityOfRecords"
                @sendPagination="receivePagination">
                    <template v-slot:data>
                    </template>
                </Pagination>
            </div>
            <div v-else>
                <p>Pagination disabled</p>
            </div>
        </div>
</template>

<script>
import Pagination from './Pagination.vue'
export default {
    created(){
        this.vueTable.totalRecords = this.quantityOfRecords;
        this.enablePagination = true;
    },
    data() {
        return {
            enablePagination: false,
            listaIsDisabled: false,
            resultados: [],
            vueTable: {
                page: 1,
                pageSize: 10,
                totalRecords: 0
            },
        }
    },
    methods:{
        captureData(data){
            this.$emit('customEvent', data);
        },
        receivePagination(currentPage, perPage){
            console.log('TEST: Recibo pagina actual desde VTable: ' + currentPage, perPage);
            let Pagination = {
                page: currentPage,
                pageSize: perPage
            }
            //this.currentPage = 1;
            this.$emit('pagination', Pagination);
        }
    },
    components:{
        Pagination
    },
    props: {
        fields: {
            type: Array,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        quantityOfRecords: {
            type: Number,
            required: true
        }
    },
    emits:
        ['customEvent', 'pagination']
    ,
}
</script>

<style lang="scss" scoped>
    #VTable-list {
        margin-top: 1%;
        height: 450px;
        font-size: large;
        text-align: center;
        overflow: scroll;
        & th {
            background-color: rgb(92, 92, 92);
            position: sticky;
            top: 0;
        }
    }
    #VTable-list tbody tr{
        transition: all 0.2s ease-in-out;
        top: 0;
    }
    #VTable-list tbody tr:hover{
        color:darkviolet;
        transition: all 0.5s ease-in-out;
    }
</style>