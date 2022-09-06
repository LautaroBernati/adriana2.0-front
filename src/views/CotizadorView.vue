<template>
    <Seleccionador
    v-on:aplicar="aplicarItem"></Seleccionador>
    <div id="listaPreview">
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cantidad</th>
                        <th>Creador</th>
                        <th>Fragancia</th>
                        <th>Sexo</th>
                        <th>Medida</th>
                        <th>Medio Pago</th>
                        <th>Precio Venta</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in items.productos" v-bind:key='index'>
                        <td>{{ item.perfume.idPerfume }}</td>
                        <td>{{ item.cantidad }}</td>
                        <td>{{ item.perfume.creator }}</td>
                        <td>{{ item.perfume.fragrance }}</td>
                        <td>{{ item.perfume.gender }}</td>
                        <td>{{ item.medida }}</td>
                        <td>{{ item.medioPago }}</td>
                        <td>{{ Number(item.precio) }}</td>
                        <td>
                            <button class="btn btn-warning" @click="borrarItem(index)">Borrar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="datosFormateados">
                <p v-for="(item, index) in items.productos" v-bind:key="index">
                    (x{{item.cantidad}}) Tester {{item.perfume.fragrance}} {{item.perfume.gender}} {{item.medida}} {{item.medioPago}} $ {{item.precio}}
                </p>
                <p>Total de $ {{items.getPrecioTotal()}}</p>
            </div>
            <button class="btn btn-success" @click="copiarDatos()"  style="margin-top: 1%;">Copiar Texto</button>
        </div>
</template>

<script>
//import PerfumesService from '../services/PerfumesService';
import Seleccionador from '../components/perfumes/Seleccionador.vue';
import Perfume from '../domain/models/Perfume.js';
import Item from '../domain/Composite/Item.js';
import ListaProductos from '../domain/Composite/ListaProductos.js'
    export default {
        data(){
            return{
                items:[],
                perfume:{}
            }
        },
        beforeMount(){
            this.items = new ListaProductos();
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
                    let perfume = new Perfume(item._id, item.idPerfume, item.creator, item.fragrance, item.gender, item.price100ml, item.price60ml);
                    let item2 = new Item(perfume, cant, item.price, medida, medioPago);
                    //this.items.push(item2);
                    this.items.addProducto(item2);  
                }
            },
            borrarItem(index){
                this.items.removeProducto(index);
            },
            copiarDatos(){
                try{
                    let text = document.getElementById("datosFormateados").innerText;
                    let clipboardData = event.clipboardData || window.clipboardData || event.originalEvent?.clipboardData || navigator.clipboard;
                    clipboardData.writeText(text);
                    
                    this.$swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Texto copiado',
                        showConfirmButton: false,
                        timer: 2000
                    })
                } catch(e){
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Falló la operación',
                        text: e.message,
                        timer: 15000
                    });
                }
            }
        },
    }
</script>

<style scoped>
#listaPreview{
    margin: 2%;
    background-color: rgb(234, 234, 234);
    border: 2px solid lightgrey;
    border-radius: 3px;
    padding: 10px;
    text-align: -webkit-center;
}
#datosFormateados{
    overflow-y: scroll;
    height: 200px;
    width: 75%;
    border: 1px solid #ccc;
    padding: 5px;
    font-weight: bold;
    text-align: left;
    margin:auto;
}
</style>