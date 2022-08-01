<template>
    <br>
    <label for="buscador">Buscador</label>
    <input type="text" id="buscador">
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
                <tr v-for="(item, index) in listaPerfumes" v-bind:key='index'>
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
        data(){
            return {
                checkedProducts:[]
            }
        },
        emits: ['enviar'],
        methods:{
            aceptar(){
                //
            },
        }
    }
</script>

<style scoped>

#btnAplicar{
    margin: 1%;
    margin-left:80%;
}
#listado1{
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