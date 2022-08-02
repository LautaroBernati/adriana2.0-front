<template>
    
    <div id="recuadroVista">
        <button class="btn btn-dark" id="btnEditarLista">Editar Lista</button>

        <ListaPrecios
            v-if="listaIsDisabled === false"
            v-bind:listaPerfumes="perfumes"
            v-on:enviar="recibirDatos">
        </ListaPrecios>
        <Formateador v-if="(!!selectedItemsParent)"
            v-bind:perfumesSeleccionados="selectedItemsParent">
        </Formateador>
    </div>
</template>

<script>
import ListaPrecios from '../components/perfumes/ListaPrecios.vue';
import Formateador from '../components/perfumes/Formateador.vue';
import PerfumesService from '../services/PerfumesService.js';
    export default {
        name: 'PreciosView',
        components:{
            ListaPrecios, Formateador,
        },
        async mounted(){
            this.service = new PerfumesService(this.$store.getters.getToken);
            try{
                let data = await this.service.getAllPerfumes();
                this.perfumes = data.data;
                this.listaIsDisabled=false; //tuve que llegar a esto para que el componente respete el asincronismo de getAllPerfumes
            } catch(e){
                console.log(e.message);
                this.$swal.fire({
                    icon: 'error',
                    title: 'Error al conectar al servidor',
                    text: 'Falló la conexión',
                });
            }
        },
        data(){
            return{
                perfumes:[],
                perfume:{},
                service:{},
                selectedItemsParent:[],
                listaIsDisabled: true
            }
        },
        methods:{
            recibirDatos(checkedProducts){
                let datosArray = JSON.parse(JSON.stringify(checkedProducts))
                this.selectedItemsParent = datosArray;
            }
        }
    }
</script>

<style scoped>
#btnEditarLista{
    margin-top: 1%;
    margin-bottom: 2%;
}
#recuadroVista{
    margin: 2%;
    background-color: rgb(234, 234, 234);
    border: 2px solid lightgrey;
    border-radius: 3px;
    padding: 10px;
}
</style>