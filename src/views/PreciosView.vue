<template>
    <button
    class="btn btn-dark">Editar Lista</button>
    
    <ListaPrecios
        v-bind:listaPerfumes="perfumes"
        v-on:enviar="recibirDatos">
    </ListaPrecios>
    <Formateador v-if="(!!selectedItemsParent)"
        v-bind:perfumesSeleccionados="selectedItemsParent">
    </Formateador>
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
        async created(){
            this.service = new PerfumesService(this.$store.getters.getToken);
            try{
                let data = await this.service.getAllPerfumes();
                this.perfumes = data.data;
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
                selectedItemsParent:[]
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

</style>