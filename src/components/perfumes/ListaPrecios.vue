<template>
    <div id="">
        <tr>
            <td id="tdInpBuscador">
                <input type="text" id="inpBuscador" class="form-control" placeholder="Escriba aqui para buscar un perfume"
                data-toggle="tooltip" data-placement="top" title="Tooltip on top" v-model="queryParam">
            </td>            
            <td id="tdBtnBuscar">
                <button class="btn btn-success" id="btnBuscar" @click="buscarPerfume">Buscar</button>
            </td>
        </tr>
    </div>

    <div id="listado1">
        <table class="table table-dark">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Creador</th>
                    <th>Fragancia</th>
                    <th>Sexo</th>
                    <th>Precio 100ml</th>
                    <th>Precio 60ml</th>
                    <th>Precio 100ml MP</th>
                    <th>Precio 60ml MP</th>
                    <th>Selector</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in localProducts" v-bind:key='index'>
                    <td>{{item.idPerfume}}</td>
                    <td>{{item.creator}}</td>
                    <td>{{item.fragrance}}</td>
                    <td>{{item.gender}}</td>
                    <td>{{item.price100ml}}</td>
                    <td>{{item.price60ml}}</td>
                    <td>{{Number(item.price100ml*0.20+item.price100ml)}}</td>
                    <td>{{Number(item.price60ml*0.20+item.price60ml)}}</td>
                    <td>
                        <input class="form-check-input" type="checkbox"
                        v-model="checkedProducts" :value="item" :id="item.idPerfume">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button class="btn btn-warning" id="btnAplicar"
    v-on:click="$emit('enviar',checkedProducts)">Aplicar Formato</button>
</template>

<script>
    export default {
        name: 'ListaPrecios',
        props: ['listaPerfumes'],
        created(){
        },
        data(){
            return {
                checkedProducts:[],
                localProducts:[] = this.listaPerfumes,
                queryParam:"",
            }
        },
        emits: ['enviar'],
        methods:{
            refrescarListaLocal(){
                this.localProducts = this.listaPerfumes;
            },
            aceptar(){
                //
            },
            buscarPerfume() {
                if (this.queryParam) {
                    this.refrescarListaLocal();
                    let array1 = ( this.localProducts.filter(item => {
                    return this.queryParam
                        .toLowerCase()
                        .split(" ")
                        .every(v => item.fragrance.toLowerCase().includes(v));
                    }) );
                    //array1 = JSON.parse(JSON.stringify(array1));
                    //console.log(this.listaPerfumes)
                    //console.log(array1)
                    this.localProducts = array1;
                } else {
                    this.refrescarListaLocal();
                }
            }
        }
    }
</script>

<style scoped>
#recuadroBuscador{
    width: 30%;
}
#tdInpBuscador{
    width: 80%;
}
#btnBuscar{
    margin-left: 20%;
}
#btnAplicar{
    margin: 1%;
    margin-left:80%;
}
#listado1{
    margin-top: 1%;
    overflow-y: scroll;
    height: 350px;
    font-size: large;
}
#listado1 tbody tr{
    transition: all 0.2s ease-in-out;
}
#listado1 tbody tr:hover{
    color:darkviolet;
    transition: all 0.5s ease-in-out;
}


</style>