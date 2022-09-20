<template>
    <Seleccionador
    v-on:aplicar="aplicarItem"></Seleccionador>
    <div id="listaPreview">
            <table class="table table-dark table-bordered text-center">
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
                        <template v-if="item.articulo">
                            <td>{{ item.articulo.id }}</td>
                            <td>{{ item.cantidad }}</td>
                            <td>{{ item.articulo.creator }}</td>
                            <td>{{ item.articulo.fragrance }}</td>
                            <td>{{ item.articulo.gender }}</td>
                            <td>{{ item.articulo.medida }}</td>
                            <td>{{ item.articulo.medioPago }}</td>
                        </template>
                        <template v-else>
                            <td>ENVIO</td>
                            <td>{{item.cantidad}}</td>
                            <td>{{item.tipoEnvio}}</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </template>
                        <td>$ {{ Number(item.calcularPrecio()) }}</td>
                        <td>
                            <button class="btn btn-warning" @click="borrarItem(index)">Borrar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="datosFormateados">
                <li v-for="(item, index) in items.productos" v-bind:key="index">
                    <template v-if="item.articulo">
                        (x{{item.cantidad}}) Tester {{item.articulo.fragrance}} {{item.articulo.gender}} {{item.articulo.medida}}mL {{item.articulo.medioPago}} $ {{Number(item.calcularPrecio())}}
                    </template>
                    <template v-else>
                        (x{{item.cantidad}}) Envio {{item.tipoEnvio}} $ {{item.precio}}
                    </template>
                </li>
                <p>Total de $ {{items.getPrecioTotal()}}</p>
            </div>
            <button class="btn btn-success" @click="copiarDatos()"  style="margin-top: 1%;">Copiar Texto</button>
        </div>
</template>

<script>
import Seleccionador from '../components/perfumes/Seleccionador.vue';
import Perfume from '../domain/Composite/Perfume.js';
import Item from '../domain/Composite/Item.js';
import ListaProductos from '../domain/Composite/ListaProductos.js'
import Producto from '../domain/Composite/Producto';
    export default {
        data(){
            return{
                items:[],
                perfume:{},
                item: {},
                envio: {}
            }
        },
        beforeMount(){
            this.items = new ListaProductos();
        },
        components:{
            Seleccionador,
        },
        methods:{
            aplicarItem(item){
                //this.item = new Item(item.articulo, item.cantidad);
                (item.articulo) ? this.item = new Item(item.articulo, item.cantidad) : this.envio = item;
                console.log(this.item)
                if(!(item instanceof Producto)){
                    this.$swal.fire({
                        position: 'bottom-end',
                        icon: 'error',
                        title: 'Error al procesar el item seleccionado',
                        showConfirmButton: false,
                        timer: 3000
                    });
                } else {
                    //let perfume = new Perfume(item._id, item.idPerfume, item.creator, item.fragrance, item.gender, item.price100ml, item.price60ml);
                    //let item2 = new Item(perfume, cant, item.price, medida, medioPago);
                    //this.items.push(item2);
                    (item.articulo) ? this.items.addProducto(this.item) : this.items.addProducto(this.envio);
                }
            },
            borrarItem(index){
                this.items.removeProducto(index);
            },
            async copiarDatos(){
                try{
                    let text = document.getElementById("datosFormateados").innerText;
                    await navigator.clipboard.writeText(text);
                    
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