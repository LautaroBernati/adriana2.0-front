<template>
    <div id="cuadradito">
        <!--<textarea id="textoFormateado">-->
        <p v-for="(item, index) in perfumesSeleccionados" v-bind:key="index" id="datosFormateados">
            Tester {{item.fragrance}} (by {{item.creator}}) <br>
            100mL: <br>
            $ {{item.price100ml}} Efectivo/Transferencia <br>
            $ {{item.price100ml*0.20+item.price100ml}} Mercado Pago <br>
            60ml: <br>
            $ {{item.price60ml}} Efectivo/Transferencia <br>
            $ {{item.price60ml*0.20+item.price60ml}} Mercado Pago <br>
        </p>
        <!--</textarea>-->
    </div>
    <div v-if="(!!perfumesSeleccionados)">
        <button class="btn btn-success" id="btnCopiar" @click="copiarDatos">Copiar</button>
    </div>
</template>

<script>
    export default {
        name: 'Formateador',
        props: ['perfumesSeleccionados'],
        data(){
            return{
                //
            }
        },
        methods:{
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
        }
    }
</script>

<style scoped>
#textoFormateado{
    height: 200px;
    width: 1000px;
    text-align: left;
    vertical-align: top;
}
#cuadradito{
    overflow-y: scroll;
    height: 200px;
    width: 75%;
    border: 1px solid #ccc;
    padding: 5px;
    font-weight: bold;
    text-align: left;
    margin:auto;
}
#btnCopiar{
    margin: 1%;
    margin-left:80%;
    width: 120px;
}
</style>