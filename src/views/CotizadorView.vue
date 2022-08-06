<template>
    <Seleccionador
    v-on:aplicar="aplicarItem"
    ></Seleccionador>
    <li v-for="(item, index) in items" v-bind:key='index'>
        Cantidad: {{item.cantidad}} ||
        ID: {{item.perfume.idPerfume}}
        {{item.perfume.creator}}
        {{item.perfume.fragrance}}
        {{item.perfume.gender}}
        {{item.medida}}
        {{item.medioPago}}
        {{item.precio}}
    </li>
</template>

<script>
//import PerfumesService from '../services/PerfumesService';
import Seleccionador from '../components/perfumes/Seleccionador.vue';
    export default {
        data(){
            return{
                items:[],
                perfume:{}
            }
        },
        components:{
            Seleccionador,
        },
        methods:{
            aplicarItem(item, cant, medida, medioPago){
                if(!item.idPerfume){
                    this.$swal.fire({
                        position: 'bottom-end',
                        icon: 'error',
                        title: 'Debe seleccionar un item',
                        showConfirmButton: false,
                        timer: 3000
                    });
                } else {
                    let perfume = JSON.parse(JSON.stringify(item));
                    let item2 = {
                        cantidad: cant,
                        precio: perfume.price,
                        medida: medida,
                        medioPago: medioPago,
                        perfume: perfume,
                    }
                    delete item2.perfume.price;
                    console.log(item2)

                    this.items.push(item2);
                }
            }
        },
    }
</script>

<style scoped>

</style>